import React from 'react';
import Searchbar from './Searchbar';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({ defaultValue }: { defaultValue?: string }) => {
  return (
    <div className="absolute max-w-[1800px] mx-auto flex flex-col sm:flex-row justify-between items-center p-4 sm:px-12 lg:py-8 gap-3 w-full">
      <Link
        href={'/'}
        className="font-bold text-red-600 text-3xl md:text-4xl"
      >
        Campflix
      </Link>
      <div className="flex items-center justify-end gap-4 w-full">
        <Searchbar defaultValue={defaultValue ?? ''} />
        <Profile />
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <Link
      href={
        'https://id.linkedin.com/in/kurnia-kharisma-agung-samiadjie-88b54a224'
      }
      target="blank"
      className="flex gap-1 items-center"
    >
      <div className="relative profile-tooltip">
        <Image
          alt="profile picture"
          src={'/profile.svg'}
          width={48}
          height={48}
          className="bg-zinc-800 cursor-pointer rounded-full"
        />
      </div>
      <p className="hidden sm:block md:text-lg hover:text-red-500 cursor-pointer duration-300">
        Kurnia
      </p>
    </Link>
  );
};

export default Navbar;
