import { ResolverContext } from "#root/graphql/types";

interface Args {
  me: boolean;
}
const getMessagesResolver = async (
  _parent: any,
  { me }: Args,
  ctx: ResolverContext
) => {
  if (!me) throw new Error("Unspported argument value !");
  const userSession = ctx.res.locals.userSession ?? null;
  if (!userSession) throw new Error("Unauthorized");
  console.log(userSession);
  const messages = await ctx.prisma.message.findMany({
    where: {
      relations: {
        OR: [
          {
            receiverId: userSession.userId,
          },
          {
            senderId: userSession.userId,
          },
        ],
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      relations: {
        select: {
          receiverId: true,
          senderId: true,
        },
      },
    },
  });
  console.log(messages);
  return messages;
};

export default getMessagesResolver;
