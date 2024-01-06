import React from 'react';
import useMovies from '@/hooks/useMovies';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchResults from './SearchResults';

const Searchbar = () => {
  const { movies, isLoading, getMovies } = useMovies('');
  const { isFocus, inputRef, debounce } = useSearchBar(getMovies);

  return (
    <div
      className={`bg-zinc-800 relative z-20 flex flex-col ${
        isFocus && inputRef.current?.value && 'rounded-b-none'
      }  w-[90%] sm:w-96 rounded-xl duration-300`}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-2 bg-zinc-800 relative z-30 rounded-xl items-center pl-4"
      >
        <button className="py-3 bg-zinc-800">
          <AnimatedSearchIcon />
        </button>
        <input
          ref={inputRef}
          onChange={(e) => debounce(e.target.value)}
          className="bg-zinc-800 py-3 focus:outline-none w-full rounded-r-xl"
          placeholder="Search a show"
        />
      </form>
      <AnimatePresence>
        {isFocus && inputRef.current?.value && (
          <SearchResults
            key={`search results`}
            isLoading={isLoading}
            movies={movies}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const useSearchBar = (getMovies: (value: string) => void) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debounce = useDebouncedCallback((value) => {
    getMovies(value);
  }, 500);

  useEffect(() => {
    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);

    const current = inputRef.current;
    if (current) {
      current.addEventListener('focus', handleFocus);
      current.addEventListener('blur', handleBlur);
    }

    return () => {
      current?.removeEventListener('focus', handleFocus);
      current?.removeEventListener('blur', handleBlur);
    };
  }, []);

  return { isFocus, inputRef, debounce };
};

const searchIconVariants = {
  initial: {
    pathLength: 0,
    color: 'rgb(255,255,255)',
    transition: { duration: 1 },
  },
  animate: {
    pathLength: 1,
    color: 'rgb(156 163 175)',
    transition: { duration: 1 },
  },
};

const AnimatedSearchIcon = () => {
  return (
    <motion.svg
      variants={searchIconVariants}
      initial="initial"
      animate="animate"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-search text-gray-400 hover:text-white duration-300"
    >
      <motion.circle variants={searchIconVariants} cx="11" cy="11" r="8" />
      <motion.path variants={searchIconVariants} d="m21 21-4.3-4.3" />
    </motion.svg>
  );
};

export default Searchbar;
