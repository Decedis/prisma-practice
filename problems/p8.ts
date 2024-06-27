import { maxBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  return prisma.starRating
    .groupBy({
      by: ["userId"],
      _avg: {
        score: true,
      },
    })
    .then((val) => {
      return minBy(val, (item) => item._avg.score ?? Infinity);
    })
    .then((result) => {
      if (result) {
        return result.userId;
      }
    })
    .catch((err) => console.error(err));
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  return prisma.starRating
    .groupBy({
      by: ["userId"],
      _avg: {
        score: true,
      },
    })
    .then((val) => {
      return maxBy(val, (item) => item._avg.score ?? Number.NEGATIVE_INFINITY);
    })
    .then((result) => {
      if (result) {
        return result.userId;
      }
    })
    .catch((err) => console.error(err));
};
