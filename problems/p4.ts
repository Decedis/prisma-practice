import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = () => {
  const result = prisma.movie.findMany({
    where: { parentalRating: "PG-13" },
    select: { parentalRating: true, releaseYear: true },
    orderBy: [{ releaseYear: "desc" }],
  });
  return result;
};
