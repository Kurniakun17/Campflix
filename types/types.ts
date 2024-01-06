type Movie = {
  show: {
    id: number;
    image?: {
      medium: string | undefined;
      original: string | undefined;
    };
    name: string;
    genres: string[];
    rating: {
      average: number;
    };
  };
};
