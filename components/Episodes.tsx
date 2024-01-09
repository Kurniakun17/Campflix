import { Episode } from '@/types/type';
import { epsToString } from '@/utils/function';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const Episodes = ({ episodes }: { episodes: Episode[] }) => {
  const [numEpisodes, setNumEpisodes] = useState(0);
  return (
    <div className="flex flex-col mt-4">
      <h2 className="text-xl font-semibold mb-2">Episodes</h2>
      {episodes.length === 0 ? (
        <div>No Episodes Found</div>
      ) : (
        <>
          <select
            value={numEpisodes}
            onChange={(e) => setNumEpisodes(parseInt(e.target.value))}
            className="mb-4 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-fit p-2.5 pr-8 bg-zinc-800 border-gray-600 placeholder-gray-400 text-white select-arrow"
          >
            {Array.from({ length: Math.ceil(episodes.length / 10) }).map(
              (_, index) => {
                const start = index * 10;
                const end =
                  index * 10 + 10 > episodes.length
                    ? episodes.length
                    : index * 10 + 10;

                return (
                  <option key={index} value={start}>
                    {epsToString(start + 1)} - {epsToString(end)}
                  </option>
                );
              }
            )}
          </select>
          <div className="grid gap-3">
            {episodes.slice(numEpisodes, numEpisodes + 10).map((episode) => {
              return (
                <div
                  key={episode.id}
                  className="flex gap-4 rounded-lg bg-zinc-800 hover:brightness-150 cursor-pointer duration-300"
                >
                  <Image
                    src={
                      episode.image?.medium ?? 'https://picsum.photos/110/160'
                    }
                    alt={`${episode.name} name`}
                    style={{ width: '100%', aspectRatio: 16 / 9 }}
                    key={episode.id}
                    width={150}
                    height={220}
                    className="cursor-pointer hover:scale-105 duration-300 max-w-[120px] sm:max-w-[150px] rounded-lg object-cover bg-zinc-800"
                  />
                  <div className="flex flex-col py-2">
                    <h3 className="line-clamp-1 cursor-pointer hover:text-red-600 duration-300">
                      {episode.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Season {episode.season} Episode {episode.number}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex w-full gap-8 justify-center mt-4">
            <button
              onClick={() =>
                setNumEpisodes((prev) => (prev - 10 < 0 ? 0 : prev - 10))
              }
              disabled={numEpisodes === 0}
              className="flex items-center pl-1 disabled:opacity-55 pr-2 py-1 rounded-lg bg-zinc-800 duration-300 hover:brightness-150 border border-transparent active:border-white"
            >
              <ChevronLeft size={20} className="mt-0.5" /> Back
            </button>
            <button
              onClick={() =>
                setNumEpisodes((prev) =>
                  prev + 10 >= episodes.length ? prev : prev + 10
                )
              }
              disabled={numEpisodes + 10 >= episodes.length}
              className="flex items-center pr-1 disabled:opacity-55 pl-2 py-1 rounded-lg bg-zinc-800 duration-300 hover:brightness-150 border border-transparent active:border-white"
            >
              Next
              <ChevronRight size={20} className="mt-0.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Episodes;
