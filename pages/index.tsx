/* eslint-disable @next/next/no-img-element */
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Image from 'next/image';
import { BASE_URL } from '@/utils/constants';

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
  bgUrl: String;
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
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-red-600">Campflix</span>
        </h1>
        <p className="mt-3 text-2xl">
          A place where you can find your favorite shows
        </p>
      </div>
      <main className="pl-4 md:pl-12 w-full flex flex-col pb-8">
        <h3 className="font-semibold text-2xl mb-2">Trending</h3>
        <div className="flex w-full overflow-x-scroll scrollbar-none pr-4 gap-4">
          {movies.map((movie) => (
            <div
              key={`${movie.show?.name} items`}
              style={{ flexBasis: '25%' }}
              className="flex flex-col gap-2"
            >
              <div className="relative group cursor-pointer">
                <img
                  className="aspect-[11/16] min-w-[150px] rounded-lg object-cover"
                  src={
                    movie.show.image?.medium ?? 'https://picsum.photos/1080/720'
                  }
                  alt=""
                />
                <div className="absolute bottom-0 w-full h-full duration-300 opacity-0 group-hover:opacity-100 flex justify-center items-center bg-gradient-to-t from-black/80 to-transparent">
                  <button className="bg-red-600 px-4 py-2 rounded-lg">
                    Play
                  </button>
                </div>
              </div>

              <a className="text-lg hover:text-red-600 duration-300 cursor-pointer">
                {movie.show.name}
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
