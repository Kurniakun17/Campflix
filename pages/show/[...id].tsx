/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/Navbar';
import { Movie, Show } from '@/hooks/useMovies';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get(`${BASE_URL}/shows/${ctx.query.id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

const DynamicShowPage = ({ data }: { data: Show }) => {
  return (
    <div className="relative bg-zinc-900 px-4 sm:px-12 flex flex-col items-center h-screen">
      <Head>
        <title>Campflix</title>
      </Head>
      <Navbar />
      <div className="mt-32 sm:mt-28 flex flex-col items-center sm:items-start gap-4 sm:gap-0 sm:flex-row w-full">
        <Image
          src={data.image?.original ?? 'https://picsum.photos/110/160'}
          alt={`${data.name} name`}
          style={{ width: '150px' }}
          key={data.id}
          width={150}
          height={220}
          className="mt-4 aspect-[11/16] w-[150px] rounded-lg object-cover bg-zinc-800"
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
    </div>
  );
};

export default DynamicShowPage;
