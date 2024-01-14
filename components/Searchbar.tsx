import React from 'react';
import useMovies from '@/hooks/useMovies';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchResults from './SearchResults';
import { useRouter } from 'next/router';

const Searchbar = ({ defaultValue }: { defaultValue: string }) => {
  const { movies, isLoading, getMovies } = useMovies(defaultValue);
  const { isFocus, setIsFocus, inputRef, formRef, debounce } =
    useSearchBar(getMovies);
  const router = useRouter();

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputRef.current?.value) return;
        router.replace(`/search/${inputRef.current?.value}`);
      }}
      className={`bg-zinc-800 relative z-20 flex flex-col ${
        isFocus && inputRef.current?.value && 'rounded-b-none'
      }  w-[100%] sm:w-96 rounded-xl duration-300`}
    >
      <div className="flex gap-2 bg-zinc-800 relative z-30 rounded-xl items-center pl-4">
        <button className="py-3 bg-zinc-800">
          <AnimatedSearchIcon />
        </button>
        <input
          ref={inputRef}
          onChange={(e) => debounce(e.target.value)}
          defaultValue={defaultValue}
          className="bg-zinc-800 py-3 focus:outline-none w-full rounded-r-xl"
          placeholder="Search a show"
        />
      </div>
      <AnimatePresence>
        {isFocus && inputRef.current?.value && (
          <SearchResults
            key={`search results`}
            inputRef={inputRef}
            isLoading={isLoading}
            movies={movies}
            setIsFocus={setIsFocus}
          />
        )}
      </AnimatePresence>
    </form>
  );
};

const useSearchBar = (getMovies: (value: string) => void) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const debounce = useDebouncedCallback((value) => {
    getMovies(value);
  }, 500);

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (formRef.current?.contains(event.target as Node)) {
        setIsFocus(true);
      } else {
        setIsFocus(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!formRef.current?.contains(event.target as Node)) {
        setIsFocus(false);
      }
    };

    window.addEventListener('focusin', handleFocus);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('focusin', handleFocus);
      window.addEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { isFocus, setIsFocus, inputRef, formRef, debounce };
};

const searchIconVariants = {
  initial: {
    pathLength: 0,
    color: 'rgb(255,255,255)',
    transition: { duration: 1 },  },
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
