import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ShowItem = ({
  id,
  name,
  imgUrl,
  genres,
  rating,
}: {
  id: number;
  name: string;
  imgUrl?: string;
  genres?: string[];
  rating?: number;
}) => {
  return (
    <div
      key={`${name} items`}
      className="flex flex-col gap-2 w-full min-w-[150px] sm:min-w-[200px] max-w-[250px]"
    >
      <div className="relative group w-full cursor-pointer">
        <Image
          width={150}
          height={220}
          style={{ width: '100%', height: 'auto' }}
          className="aspect-[11/16] w-full rounded-lg object-cover"
          src={imgUrl ?? 'https://picsum.photos/1080/720'}
          alt="asd"
        />
        <div className="absolute bottom-0 w-full h-full duration-300 opacity-0 group-hover:opacity-100 flex justify-center items-center bg-gradient-to-t from-black/80 to-transparent">
          <button className="bg-red-600 px-4 py-2 rounded-lg">Play</button>
        </div>
      </div>
      <div className="flex flex-col">
        <Link
          href={`/show/${id}`}
          className="text-lg md:text-xl hover:text-red-600 duration-300 cursor-pointer"
        >
          {name}
        </Link>
        <div className="flex gap-1 md:text-md text-gray-400 line-clamp-1">
          {genres?.map((genre, index) => (
            <div key={index}>
              <span className="rounded-lg text-sm">{genre}</span>
              {index < genres.length - 1 && ', '}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Star size={20} className='stroke-[1.2px]'/>
          <p className="text-sm md:text-md mt-0.5">{rating ? rating : 'NR'}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowItem;
