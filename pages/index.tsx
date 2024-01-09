/* eslint-disable @next/next/no-img-element */
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import { Movie, Show } from '@/types/type';
import ShowItem from '@/components/ShowItem';
import { format } from 'date-fns';

const poppins = Poppins({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const formattedDate = format(date, 'yyyy-MM-dd');

  const girlsRes = await axios.get(`${BASE_URL}/search/shows?q=girls`);
  const newEpsRes = await axios.get(
    `${BASE_URL}/schedule?country=JP&date=${formattedDate}`
  );

  const newEps = newEpsRes.data.map((movie: Movie) => movie.show);
  return {
    props: {
      movies: girlsRes.data,
      bgUrl: girlsRes.data[4].show.image?.original,
      newEps: newEps.slice(0, 10),
    },
  };
};

export default function Home({
  movies,
  bgUrl,
  newEps,
}: {
  movies: Movie[];
  bgUrl: string;
  newEps: Show[];
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
        <h3 className="font-semibold text-2xl  ">Trending</h3>
        <div className="flex w-full overflow-x-scroll scrollbar-none pr-4 gap-4 lg:gap-6">
          {movies.map((movie) => (
            <ShowItem
              key={movie.show.id}
              rating={movie.show.rating.average}
              id={movie.show.id}
              name={movie.show.name}
              genres={movie.show.genres}
              imgUrl={movie.show.image?.medium}
              url={movie.show.url}
            />
          ))}
        </div>
      </section>
      <section className="pl-4 max-w-[1800px] md:pl-12 w-full flex flex-col gap-4 pb-8">
        <h3 className="font-semibold text-2xl  ">New Episodes</h3>
        <div className="flex w-full overflow-x-scroll scrollbar-none pr-4 gap-4 lg:gap-6">
          {newEps.map((movie) => (
            <ShowItem
              key={movie.id}
              rating={movie.rating.average}
              id={movie.id}
              name={movie.name}
              genres={movie.genres}
              imgUrl={movie.image?.medium}
              url={movie.url}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
