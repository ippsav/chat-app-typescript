import { ResolverContext } from "#root/graphql/types";

interface Args {
  receiverId: string;
  message: string;
}
const createMessageResolver = async (
  _parent: any,
  { message, receiverId }: Args,
  ctx: ResolverContext
) => {
  const userSession = ctx.res.locals.userSession ?? null;
  console.log(userSession);
  if (!userSession) throw new Error("Unauthorized");
  if (userSession.userId === receiverId) throw new Error("Unauthorized");
  try {
    await ctx.prisma.message.create({
      data: {
        body: message,
        relations: {
          create: {
            receiverId,
            senderId: userSession.userId,
          },
        },
      },
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default createMessageResolver;
