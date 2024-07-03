import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  return prisma.starRating
    .aggregate({
      _avg: { score: true },
      where: { userId },
    })
    .then((aggregatedRating) => aggregatedRating._avg.score);
};
