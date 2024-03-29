import Navbar from '@/components/Navbar';
import ShowItem from '@/components/ShowItem';
import { Movie } from '@/types/type';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get(`${BASE_URL}/search/shows?q=${ctx.params?.name}`);

  return {
    props: {
      movies: res.data,
      searchValue: ctx.params?.name,
    },
  };
};

const SearchPage = ({
  movies,
  searchValue,
}: {
  movies: Movie[];
  searchValue: string;
}) => {
  return (
    <div className="relative bg-zinc-900 px-4 sm:px-12 flex flex-col items-center min-h-screen">
      <Head>
        <title>Campflix</title>
      </Head>
      <Navbar defaultValue={searchValue} />
      <div className="mt-32 sm:mt-28 flex w-[95%] max-w-[1600px] mx-auto flex-col gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Search results for {searchValue}</h1>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 gap-y-8">
          {movies.length > 0 ? (
            movies.map((movie) => {
              return (
                <ShowItem
                  key={movie.show.id}
                  imgUrl={movie.show.image?.medium}
                  id={movie.show.id}
                  name={movie.show.name}
                  genres={movie.show.genres}
                  rating={movie.show.rating.average}
                  url={movie.show.url}
                />
              );
            })
          ) : (
            <h2 className="text-xl sm:text-2xl font-semibold text-center col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-6">
              There is no show{' '}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
