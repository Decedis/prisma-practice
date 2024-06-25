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
  const starRatings: StarRatingWithMovie[] = await prisma.starRating.findMany({
    include: { movie: true },
    orderBy: { id: "asc" },
  });
  //get movie averages
  const averages: Record<number, MovieWithAverageScore> = starRatings.reduce(
    (acc, rating) => {
      if (!acc[rating.movieId]) {
        acc[rating.movieId] = { sum: 0, count: 0, movie: rating.movie };
      }
      acc[rating.movieId].sum += rating.score;
      acc[rating.movieId].count += 1;
      return acc;
    },
    {} as Record<number, MovieWithAverageScore>
  );
  const averagesArr = Object.values(averages);
  console.log(averagesArr);

  return averagesArr
    .filter(({ sum, count }) => sum / count > n) //destructure necessary values
    .map(({ movie }) => movie);
};
