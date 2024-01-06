import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
type Movie = {
  show: Show;
};

type Show = {
  id: number;
  image?: {
    medium: string | undefined;
    original: string | undefined;
  };
  name: string;
  summary: string;
  genres: string[];
  rating: {
    average: number;
  };
  network?: {
    name: string;
  };
  webChannel: {
    name: string;
  };
  status: string;
};

const useMovies = (initialQuery: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getMovies = async (query: string) => {
    setIsLoading(true);
    const res = await axios.get(`${BASE_URL}/search/shows?q=${query}`);
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

export type { Movie,Show };
