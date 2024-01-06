/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/Navbar';
import { Movie, Show } from '@/hooks/useMovies';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import { GetServerSideProps } from 'next';
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
  console.log(data);
  return (
    <div className="relative bg-zinc-900 px-4 sm:px-12 flex flex-col items-center  h-screen">
      <Navbar />
      <div className='mb-16'></div>
      <div className="flex">
        <img
          src={data.image?.original ?? 'https://picsum.photos'}
          alt={`${data.name} name`}
          className="mt-4 aspect-[11/16] max-w-[150px] rounded-lg"
        />
        <div className="max-w-2xl mx-auto p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
          <p className="text-gray-500 mb-4">{data.summary}</p>
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
