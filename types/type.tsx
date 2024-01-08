type Movie = {
  show: Show;
};

type Show = {
  id: number;
  image?: {
    medium: string | undefined;
    original: string | undefined;
  };
  name: string;
  summary: string;
  genres: string[];
  rating: {
    average: number;
  };
  network?: {
    name: string;
  };
  webChannel: {
    name: string;
  };
  status: string;
  _embedded?: {
    episodes: Episode[];
  };
};

type Episode = {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  rating: {
    average: number | null;
  };
  image: null | {
    medium: string;
    original: string;
  };
  summary: string;
  _links: {
    self: {
      href: string;
    };
    show: {
      href: string;
    };
  };
};

export type { Movie, Show, Episode };
