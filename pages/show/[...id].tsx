/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/Navbar';
import { Show } from '@/hooks/useMovies';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get(
    `${BASE_URL}/shows/${ctx.query.id}?embed=episodes`
  );

  return {
    props: {
      data: res.data,
    },
  };
};

const DynamicShowPage = ({ data }: { data: Show }) => {
  console.log(data._embedded?.episodes);
  return (
    <div className="relative bg-zinc-900 px-4 sm:px-12 flex flex-col items-center min-h-screen">
      <Head>
        <title>Campflix</title>
      </Head>
      <Navbar />
      <div className="flex flex-col gap-2 mt-32 sm:mt-28 ">
        <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-0 sm:flex-row w-full">
          <Image
            src={data.image?.original ?? 'https://picsum.photos/110/160'}
            alt={`${data.name} name`}
            style={{ width: '100%' }}
            key={data.id}
            width={150}
            height={220}
            className="mt-4 aspect-[11/16] max-w-[150px] lg:max-w-[260px] rounded-lg object-cover bg-zinc-800"
          />
          <div className="w-full flex flex-col gap-2 mx-auto sm:px-8 sm:py-4 rounded-lg">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            {data.summary ? (
              <div
                dangerouslySetInnerHTML={{ __html: data.summary }}
                className="mb-2 text-gray-400"
              />
            ) : (
              <div>
                <p>No summary available</p>
              </div>
            )}
            <div className="flex space-x-4">
              {data.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 rounded-lg text-sm text-gray-700"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h2 className="text-xl font-semibold mb-3">Episodes</h2>
          <div className="pl-4 grid gap-3">
            {data._embedded?.episodes.map((episode) => {
              return (
                <div key={episode.id} className="flex gap-4 ">
                  <Image
                    src={
                      episode.image?.medium ?? 'https://picsum.photos/110/160'
                    }
                    alt={`${episode.name} name`}
                    style={{ width: '100%' }}
                    key={episode.id}
                    width={150}
                    height={220}
                    className="cursor-pointer hover:scale-105 duration-300 max-w-[100px] sm:max-w-[150px] rounded-lg object-cover bg-zinc-800"
                  />
                  <div className="flex flex-col">
                    <h3 className="line-clamp-1 cursor-pointer hover:text-red-600 duration-300">
                      {episode.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Season {episode.season} Episode {episode.number}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicShowPage;
