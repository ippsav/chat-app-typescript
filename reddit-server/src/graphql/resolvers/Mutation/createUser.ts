import { ResolverContext } from "#root/graphql/types";
import hashPasswordSync from "#root/helpers/hashPasswordSync";
import isEmail from "#root/helpers/isEmail";

interface Args {
  username: string;
  password: string;
  email: string;
}

const createUserResolver = async (
  obj: any,
  { email, password, username }: Args,
  { prisma }: ResolverContext
) => {
  if (!isEmail(email)) throw new Error("Wrong email format !");
  let usedUser = await prisma.user.findMany({
    where: {
      email,
      OR: {
        username,
      },
    },
  });
  if (usedUser.length !== 0)
    throw new Error("Email or username is already in use !");
  const user = await prisma.user.create({
    data: {
      email,
      username,
      passwordHash: hashPasswordSync(password),
    },
  });
  return user;
};

export default createUserResolver;
