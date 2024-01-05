import Image from 'next/image';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import Searchbar from '@/components/Searchbar';
import Navbar from '@/components/Navbar';

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
      <Navbar />
    </div>
  );
}
