import dayjs from "dayjs";

import { ResolverContext } from "#root/graphql/types";
import accessEnv from "#root/helpers/accessEnv";
import comparePasswordSync from "#root/helpers/comparePasswordSync";
import isEmail from "#root/helpers/isEmail";

interface Args {
  email: string;
  password: string;
}
const USER_SESSION_EXPIRES_HOURS = accessEnv<number>(
  "USER_SESSION_EXPIRES_HOURS"
);

const createUserSessionResolver = async (
  obj: any,
  { email, password }: Args,
  { res, prisma }: ResolverContext
) => {
  if (!isEmail(email)) throw new Error("Wrong email format !");
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user && comparePasswordSync(password, user.passwordHash)) {
    let userSession =
      (await prisma.session.findFirst({ where: { userId: user.id } })) ?? null;
    if (userSession)
      await prisma.session.delete({ where: { id: userSession.id } });
    userSession = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: dayjs()
          .add(USER_SESSION_EXPIRES_HOURS, "hours")
          .toISOString(),
      },
    });
    res.cookie("userSessionId", userSession.id, {
      httpOnly: true,
      expires: userSession.expiresAt,
      sameSite: "lax",
    });
    return userSession;
  }
  throw new Error("Invalid Credentials !");
};

export default createUserSessionResolver;
