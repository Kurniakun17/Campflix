import { Star, Tv } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const SearchItem = ({
  name,
  url = 'https://picsum.photos/45/58',
  isEven,
  rating = 0,
  status,
  showingOn,
}: {
  name: string;
  rating: Number;
  url: string | undefined;
  isEven: boolean;
  status: string;
  showingOn: string;
}) => {
  console.log(status);
  return (
    <div
      className={`flex gap-2 cursor-pointer px-4 py-2 ${
        isEven ? 'bg-zinc-900 ' : 'bg-[rgb(20,20,23)]'
      } duration-300 hover:bg-red-600`}
    >
      <Image
        className="h-auto aspect-[12/16]"
        width={45}
        height={58}
        src={url}
        alt={`${name} images`}
      />
      <div className="flex flex-col gap-0.5">
        <p className="">{name}</p>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <div className="flex gap-1 items-center justify-center">
            <Star size={14} />
            <p className="">
              {rating !== -1 ? rating.toString() : 'NR'}
            </p>
          </div>
          <div className="h-1 w-1 bg-zinc-400 rounded-full" />

          <div className="flex gap-1 items-center justify-center">
            <Tv size={13} />
            <p>{showingOn}</p>
          </div>
          <div className="h-1 w-1 bg-zinc-400 rounded-full" />
          <p>{status === 'To Be Determined' ? 'On-Going' : status}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
