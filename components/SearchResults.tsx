import { ArrowRight, Loader2 } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import SearchItem from './SearchItem';
import { Movie } from '@/types/type';
import { useRouter } from 'next/router';

const searchBarVariants = {
  initial: { y: '90%', opacity: 0 },
  animate: { y: '100%', opacity: 1 },
  exit: { y: '100%', opacity: 0, height: 0, padding: 0 },
};

const SearchResults = ({
  inputRef,
  isLoading,
  movies,
  setIsFocus,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  movies: Movie[];
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <motion.div
        key={'search item loading'}
        variants={searchBarVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className={`flex justify-center py-3 absolute bg-zinc-800 w-full z-10 rounded-b-xl`}
      >
        <Loader2 className="animate-spin" />
      </motion.div>
    );
  }

  return movies.length > 0 ? (
    <motion.div
      key={`rendered search item`}
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
          isEven={(index + 1) % 2 === 0}
          key={`${movies[index].show.name} search item`}
          id={movies[index].show.id}
          url={movies[index].show.image?.medium}
          rating={movies[index].show.rating?.average ?? -1}
          name={movies[index].show.name}
          showingOn={
            movies[index].show.network?.name ??
            movies[index].show.webChannel?.name
          }
          status={movies[index].show.status}
          setIsFocus={setIsFocus}
        />
      ))}
      <div className="flex justify-center px-3 py-3 w-full text-sm duration-300 bg-[rgb(43,43,46)]">
        <motion.button
          whileHover="hovered"
          onClick={() => {
            setIsFocus(false);
            router.push(`/search/${inputRef.current?.value}`);
          }}
          className="flex gap-1 cursor-pointer duration-300 text-white/60 hover:text-white/90 underline"
        >
          View All Shows{' '}
          <motion.span className="underline" variants={{ hovered: { x: 10 } }}>
            <ArrowRight className="size-5" />
          </motion.span>
        </motion.button>
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
  );
};

export default SearchResults;
