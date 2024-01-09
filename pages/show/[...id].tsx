/* eslint-disable @next/next/no-img-element */
import Episodes from '@/components/Episodes';
import Navbar from '@/components/Navbar';
import { Show } from '@/types/type';
import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import { Star } from 'lucide-react';
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
  return (
    <div className="relative bg-zinc-900 px-4 sm:px-12 flex flex-col items-center min-h-screen">
      <Head>
        <title>Campflix</title>
      </Head>
      <Navbar />
      <div className="flex w-[95%] max-w-[1600px] mx-auto flex-col gap-2 mt-32 sm:mt-28 mb-6 ">
        <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-0 sm:flex-row w-full">
          <Image
            src={data.image?.original ?? 'https://picsum.photos/110/160'}
            alt={`${data.name} name`}
            style={{ width: '100%' }}
            key={data.id}
            width={150}
            height={220}
            className="mt-4 aspect-[11/16] max-w-[150px] lg:max-w-[260px] rounded-lg object-cover bg-zinc-700"
          />
          <div className="w-full flex flex-col gap-2 mx-auto sm:px-8 sm:py-4 rounded-lg">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <Rating rating={data.rating?.average} />
            <Status status={data.status} />
            <Summary summary={data.summary} />
            <Genres genres={data.genres} />
          </div>
        </div>
        <Episodes episodes={data._embedded?.episodes!} />
      </div>
    </div>
  );
};

const Status = ({ status }: { status: string }) => {
  return (
    <div className="flex gap-2">
      <span className="text-gray-400">Status:</span>
      <span className="text-gray-200 font-semibold">
        {status === 'To Be Determined' || status === 'Running'
          ? 'On-Going'
          : status}
      </span>
    </div>
  );
};

const Summary = ({ summary }: { summary: string }) => {
  return summary ? (
    <div
      dangerouslySetInnerHTML={{ __html: summary }}
      className="mb-2 text-gray-400"
    />
  ) : (
    <div>
      <p>No summary available</p>
    </div>
  );
};

const Genres = ({ genres }: { genres: string[] }) => {
  return (
    <div className="flex gap-4">
      {genres.map((genre, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-gray-200 rounded-lg text-sm text-gray-700"
        >
          {genre}
        </span>
      ))}
    </div>
  );
};

const Rating = ({ rating }: { rating?: number }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-1 items-center p-2 px-3 bg-zinc-800 rounded-lg font-bold text-xl">
        <Star
          className={`${
            rating ? 'text-red-600 fill-red-600' : 'text-gray-400 fill-gray-400'
          }`}
        />
        <p className="text-gray-200">{rating ? `${rating}/10` : 'No Rating'}</p>
      </div>
    </div>
  );
};

export default DynamicShowPage;
