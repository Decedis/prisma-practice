import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  //NOTE: In the Prisma schema, there is an option to delete related items.
  //these are referential actions.
  //onDelete: Cascade <= this is the code that needs to be present in the schema.
  const ratingDelete = prisma.starRating.deleteMany({
    where: { user: { age: { lt: n } } },
  });
  const userDelete = prisma.user.deleteMany({
    where: { age: { lt: n } },
  });

  return await prisma.$transaction([ratingDelete, userDelete]);
};
