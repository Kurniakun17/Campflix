import Image from 'next/image';
import React from 'react';

const SearchItem = ({
  name,
  url = 'https://picsum.photos/45/58',
  isEven,
  rating = 0,
}: {
  name: String;
  rating: Number;
  url: string | undefined;
  isEven: Boolean;
}) => {
  return (
    <div
      onClick={() => console.log(name)}
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
      <div className='flex flex-col gap-1'>
        <p>{name}</p>
        <div className="flex gap-2 text-sm text-zinc-300">{rating !== -1 ? rating.toString() : 'No Rating'}</div>
      </div>
    </div>
  );
};

export default SearchItem;
