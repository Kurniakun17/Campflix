import React from 'react';
import { Search } from 'lucide-react';
import useMovies from '@/hooks/useMovies';
import SearchItem from '@/components/SearchItem';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const searchBarVariants = {
  initial: { y: '80%', opacity: 0 },
  animate: { y: '100%', opacity: 1 },
  exit: { y: '100%', opacity: 0, height: 0, padding: 0 },
};

const Searchbar = () => {
  const { movies, isLoading, getMovies } = useMovies('');
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

  return (
    <div
      className={`bg-zinc-800 relative z-20 flex flex-col rounded-xl ${
        isFocus && 'rounded-b-none'
      }  w-[90%] sm:w-96 duration-300`}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-2 relative z-30 items-center pl-4"
      >
        <button className="py-3 bg-zinc-800">
          <Search size={24} />
        </button>
        <input
          ref={inputRef}
          onChange={(e) => debounce(e.target.value)}
          className="bg-zinc-800 py-3 focus:outline-none w-full rounded-r-xl"
          placeholder="Search a show"
        />
      </form>
      <AnimatePresence>
        {!isLoading &&
          isFocus &&
          (movies.length > 0 ? (
            <motion.div
              key={`${movies.length} search item`}
              variants={searchBarVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className={`flex flex-col absolute bottom-0 -translate-y-20 w-full rounded-b-xl overflow-hidden`}
            >
              {Array.from({
                length: movies.length > 4 ? 4 : movies.length,
              }).map((_, index) => (
                <SearchItem
                  isEven={index % 2 === 0}
                  key={`${movies[index].show.name} search item`}
                  url={movies[index].show.image?.medium}
                  name={movies[index].show.name}
                />
              ))}
              <div className="flex gap-2">
                <p></p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key={'search item not found'}
              variants={searchBarVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className={`text-center py-3 absolute bg-zinc-800 w-full z-10 rounded-b-xl`}
            >
              There is no result
            </motion.p>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Searchbar;
// ${
/* !isLoading && isFocus && movies.length === 0 && 'pt-3' */
// }
