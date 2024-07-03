import { groupBy, map, reduce, sumBy, values } from "remeda";
import { prisma } from "./prisma";
import { Movie, StarRating } from "@prisma/client";

type MovieWithAverageScore = {
  sum: number;
  count: number;
  movie: Movie;
};
type StarRatingWithMovie = StarRating & {
  //intersection type
  movie: Movie;
};

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const starRatingsWithMovies = await prisma.starRating.groupBy({
    by: ["movieId"],
    having: {
      score: {
        _avg: {
          gt: n,
        },
      },
    },
  });
  return prisma.movie.findMany({
    where: {
      id: {
        in: starRatingsWithMovies.map((rating) => rating.movieId),
      },
    },
  });
};
