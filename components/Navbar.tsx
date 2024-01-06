import React from 'react';
import Searchbar from './Searchbar';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="absolute flex flex-col sm:flex-row justify-between items-center p-4 sm:px-12 lg:py-8 gap-3 w-full">
      <Link
        href={'/'}
        className="font-bold text-red-600  text-3xl sm:text-2xl md:text-4xl"
      >
        Campflix
      </Link>
      <div className="flex items-center justify-end gap-4 w-full">
        <Searchbar />
        <p>Kurnia AS</p>
      </div>
    </div>
  );
};

export default Navbar;
