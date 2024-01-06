import axios from 'axios';
import { useEffect, useState } from 'react';

type Movie = {
  show: {
    id: number;
    image?: {
      medium: string | undefined;
      original: string | undefined;
    };
    name: string;
    genres: string[];
    rating: {
      average: number;
    };
  };
};

const useMovies = (initialQuery: String) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getMovies = async (query: String) => {
    setIsLoading(true);
    const res = await axios.get(
      `http://api.tvmaze.com/search/shows?q=${query}`
    );
    setMovies(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { movies, isLoading, getMovies };
};

export default useMovies;

export type { Movie };