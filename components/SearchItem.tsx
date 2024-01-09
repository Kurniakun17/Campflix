import { Star, Tv } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const SearchItem = ({
  id,
  name,
  url,
  isEven,
  rating = 0,
  status,
  showingOn,
  setIsFocus,
}: {
  id: number;
  name: string;
  rating: Number;
  url?: string | undefined;
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
      {url ? (
        <Image
          className="h-auto aspect-[12/16] w-full object-cover"
          style={{ width: 'auto' }}
          width={45}
          height={58}
          src={url}
          alt={`${name} images`}
        />
      ) : (
        <div className="aspect-[12/16] w-[45px] h-[58px] object-cover bg-zinc-900 duration-300 flex flex-col gap-2 justify-center items-center">
          <svg
            className="w-4 h-4 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
          {/* <p className="font-semibold">No Image</p> */}
        </div>
      )}

      <div className="flex flex-col gap-0.5">
        <p className="text-start">{name}</p>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
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
          <p>
            {status === 'To Be Determined' || status === 'Running'
              ? 'On-Going'
              : status}
          </p>
        </div>
      </div>
    </button>
  );
};

export default SearchItem;
