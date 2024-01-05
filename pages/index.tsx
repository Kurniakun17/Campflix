import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import Searchbar from '@/components/Searchbar';

const poppins = Poppins({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
});

export default function Home() {
  return (
    <div
      className={`flex bg-zinc-900 min-h-screen flex-col items-center justify-between ${poppins.className}`}
    >
      <Head>
        <title>Campflix</title>
      </Head>
      <div className="flex flex-col md:flex-row justify-between items-center py-4 px-12 gap-3 w-full">
        <h1 className="font-bold text-red-500 text-2xl">Campflix</h1>
        <div className='flex items-center gap-4'>
          <Searchbar />
          <p>Kurnia AS</p>
        </div>
      </div>
    </div>
  );
}
