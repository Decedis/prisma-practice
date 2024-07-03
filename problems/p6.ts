import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  //  relationLoadStrategy: "query",
  // NOTE: for some reason, the test sometimes fails. Hasn't occurred recently.
  //Andrei's solution
  // const userMovies = await prisma.user.findUnique({
  //   where: { id: userId },
  //   select: {
  //     starRatings: {
  //       select: {
  //         movie: true,
  //       },
  //     },
  //   },
  // });
  // if (!userMovies) return [];
  // return userMovies.starRatings.map((rating) => rating.movie);

  const userMovieQuery = await prisma.starRating.findMany({
    where: { userId: userId },
    include: { movie: true },
  });

  return userMovieQuery.map((movie) => movie.movie);
};
