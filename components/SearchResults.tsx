import { ArrowRight, Loader2 } from 'lucide-react';
import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import SearchItem from './SearchItem';

const searchBarVariants = {
  initial: { y: '90%', opacity: 0 },
  animate: { y: '100%', opacity: 1 },
  exit: { y: '100%', opacity: 0, height: 0, padding: 0 },
};

const SearchResults = ({
  isLoading,
  movies,
}: {
  isLoading: boolean;
  movies: Movie[];
}) => {
  if (isLoading) {
    return (
      <motion.div
        key={'search item loading'}
        variants={searchBarVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className={`flex justify-center py-3 absolute bg-zinc-900 w-full z-10 rounded-b-xl`}
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
          url={movies[index].show.image?.medium}
          rating={movies[index].show.rating?.average ?? -1}
          name={movies[index].show.name}
        />
      ))}
      <div className="flex justify-center px-3 py-3 w-full text-sm duration-300 bg-zinc-900">
        <motion.a
          whileHover="hovered"
          className="flex gap-1 cursor-pointer duration-300 text-white/60 hover:text-white/90 underline"
        >
          View All Shows{' '}
          <motion.span className="underline" variants={{ hovered: { x: 10 } }}>
            <ArrowRight className='size-5' />
          </motion.span>
        </motion.a>
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
      className={`text-center py-3 absolute bg-zinc-900 w-full z-10 rounded-b-xl`}
    >
      There is no result
    </motion.p>
  );
};

export default SearchResults;
