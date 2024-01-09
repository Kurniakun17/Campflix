import { Star, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ShowItem = ({
  id,
  name,
  imgUrl,
  genres,
  rating,
  url,
}: {
  id: number;
  name: string;
  imgUrl?: string;
  genres?: string[];
  rating?: number;
  url: string;
}) => {
  return (
    <div
      key={`${name} items`}
      className="flex flex-col gap-2 w-full min-w-[150px] sm:min-w-[200px] max-w-[250px]"
    >
      <div className="relative group w-full cursor-pointer">
        {imgUrl ? (
          <Image
            width={150}
            height={220}
            style={{ width: '100%', height: 'auto' }}
            className="aspect-[11/16] w-full rounded-lg bg-zinc-700 duration-300 object-cover"
            src={imgUrl ?? 'https://picsum.photos/1080/720'}
            alt="asd"
          />
        ) : (
          <div className="aspect-[11/16] w-full rounded-lg bg-zinc-800 duration-300 flex flex-col gap-2 justify-center items-center object-cover">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
            <p className='font-semibold'>No Image</p>
          </div>
        )}

        <div className="absolute bottom-0 w-full h-full duration-300 opacity-0 group-hover:opacity-100 flex justify-center items-center bg-gradient-to-t from-black/80 to-transparent">
          <Link
            target="_blank"
            href={url}
            className="bg-red-600 hover:scale-95 duration-300 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 font-semibold"
          >
            <Tv size={16} /> TV Maze
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <Link
          href={`/show/${id}`}
          className="text-md hover:text-red-600 duration-300 cursor-pointer w-fit line-clamp-1"
        >
          {name}
        </Link>
        <p className="md:text-md text-gray-400 break-words line-clamp-1">
          {genres?.map((genre, index) => (
            <span className="rounded-lg text-sm" key={`${genre} ${index}`}>
              {genre}
              {index < genres.length - 1 && ', '}
            </span>
          ))}
        </p>
        <div className="flex items-center gap-1 text-gray-400">
          <Star size={20} className="stroke-[1.2px]" />
          <p className="text-sm md:text-md mt-0.5">{rating ? rating : 'NR'}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowItem;
