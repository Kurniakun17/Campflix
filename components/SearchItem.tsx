import { Star, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const SearchItem = ({
  id,
  name,
  url = 'https://picsum.photos/45/58',
  isEven,
  rating = 0,
  status,
  showingOn,
  setIsFocus,
}: {
  id: number;
  name: string;
  rating: Number;
  url: string | undefined;
  isEven: boolean;
  status: string;
  showingOn: string;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        router.replace(`/show/${id}`);
        setIsFocus(false);
      }}
      className={`flex gap-3 cursor-pointer px-4 py-2  outline-zinc-200 ${
        isEven ? 'bg-zinc-800 ' : 'bg-[rgb(43,43,46)]'
      } hover:bg-zinc-700 duration-300 
      `}
    >
      {' '}
      <Image
        className="h-auto aspect-[12/16] object-cover"
        style={{ width: 'auto' }}
        width={45}
        height={58}
        src={url}
        alt={`${name} images`}
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-start">{name}</p>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <div className="flex gap-1 items-center justify-center">
            <Star size={14} />
            <p className="">{rating !== -1 ? rating.toString() : 'NR'}</p>
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
    </button>
  );
};

export default SearchItem;
