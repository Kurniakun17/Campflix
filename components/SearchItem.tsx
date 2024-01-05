import Image from 'next/image';
import React from 'react';

const SearchItem = ({
  name,
  url = 'https://picsum.photos/45/58',
  isEven,
}: {
  name: String;
  url: string | undefined;
  isEven: Boolean;
}) => {
  return (
    <div
      onClick={() => console.log(name)}
      className={`flex gap-2 cursor-pointer px-4 py-2 ${
        isEven
          ? 'bg-zinc-700/30 hover:bg-zinc-700/20'
          : 'bg-zinc-800 hover:bg-zinc-800/50'
      } duration-300`}
    >
      <Image
        className="h-auto aspect-[12/16]"
        width={45}
        height={58}
        src={url}
        alt={`${name} images`}
      />
      {name}
    </div>
  );
};

export default SearchItem;
