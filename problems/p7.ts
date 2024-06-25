import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  //   return prisma.starRating
  //     .findMany({ where: { userId: userId } })
  //     .then((rating) => {
  //       let sum = 0;
  //       rating.forEach((score) => (sum += score.score));

  //       return sum / rating.length;
  //     })
  //     .catch((err) => console.error(err));
  return prisma.user
    .findUnique({
      where: { id: userId },
      include: { starRatings: true },
    })
    .then((data) => data?.starRatings)
    .then((rating) => {
      if (!rating) return 0;
      let sum = 0;
      rating.forEach((score) => (sum += score.score));
      return sum / rating.length;
    })
    .catch((err) => {
      console.error(err);
      return 0;
    });
};
