import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  //  relationLoadStrategy: "query",
  // NOTE: for some reason, the test sometimes fails. Hasn't occurred recently.
  const userMovieQuery = prisma.starRating.findMany({
    where: { userId: userId },
    include: { movie: true, user: true },
  });

  return (await userMovieQuery).map((movie) => movie.movie);
};
