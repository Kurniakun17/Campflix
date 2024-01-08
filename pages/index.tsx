/* eslint-disable @next/next/no-img-element */
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import { Movie } from '@/types/type';
import ShowItem from '@/components/ShowItem';

const poppins = Poppins({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get(`${BASE_URL}/search/shows?q=girls`);

  return {
    props: {
      movies: res.data,
      bgUrl: res.data[5].show.image?.original,
    },
  };
};

export default function Home({
  movies,
  bgUrl,
}: {
  movies: Movie[];
  bgUrl: string;
}) {
  return (
    <div
      className={`flex bg-zinc-900 flex-col gap-8 items-center justify-between ${poppins.className}`}
    >
      <Head>
        <title>Campflix</title>
      </Head>
      <Navbar />
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
        className={`flex flex-col min-h-screen items-center justify-center flex-1 w-full px-20 text-center`}
      >
        <h1 className="text-4xl lg:text-6xl font-bold">
          Welcome to <span className="text-red-600">Campflix</span>
        </h1>
        <p className="mt-2 lg:mt-3 text-1xl">
          A place where you can find your favorite shows
        </p>
      </div>
      <section className="pl-6 max-w-[1800px] md:pl-12 w-full flex flex-col gap-4">
        <h3 className="font-semibold text-2xl lg:text-3xl ">Trending</h3>
        <div className="flex w-full overflow-x-scroll scrollbar-none pr-4 gap-4">
          {movies.map((movie) => (
            <ShowItem
              key={movie.show.id}
              rating={movie.show.rating.average}
              id={movie.show.id}
              name={movie.show.name}
              genres={movie.show.genres}
              imgUrl={movie.show.image?.medium}
            />
          ))}
        </div>
      </section>
      <section className="pl-4 max-w-[1800px] md:pl-12 w-full flex flex-col gap-4 pb-8">
        <h3 className="font-semibold text-2xl lg:text-3xl ">Trending</h3>
        <div className="flex w-full overflow-x-scroll scrollbar-none pr-4 gap-4">
          {movies.map((movie) => (
            <ShowItem
              key={movie.show.id}
              rating={movie.show.rating.average}
              id={movie.show.id}
              name={movie.show.name}
              genres={movie.show.genres}
              imgUrl={movie.show.image?.medium}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
