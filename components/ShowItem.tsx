import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ShowItem = ({
  id,
  name,
  imgUrl,
}: {
  id: number;
  name: string;
  imgUrl?: string;
}) => {
  return (
    <div
      key={`${name} items`}
      className="flex flex-col gap-2 w-fit min-w-[150px] sm:min-w-[200px]"
    >
      <div className="relative group w-full cursor-pointer">
        <Image
          width={150}
          height={220}
          style={{ width: 'auto' }}
          className="aspect-[11/16] w-full rounded-lg object-cover"
          src={imgUrl ?? 'https://picsum.photos/1080/720'}
          alt="asd"
        />
        <div className="absolute bottom-0 w-full h-full duration-300 opacity-0 group-hover:opacity-100 flex justify-center items-center bg-gradient-to-t from-black/80 to-transparent">
          <button className="bg-red-600 px-4 py-2 rounded-lg">Play</button>
        </div>
      </div>

      <Link
        href={`/show/${id}`}
        className="text-lg hover:text-red-600 duration-300 cursor-pointer"
      >
        {name}
      </Link>
    </div>
  );
};

export default ShowItem;
