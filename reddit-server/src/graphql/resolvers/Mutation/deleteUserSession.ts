import { ResolverContext } from "#root/graphql/types";

interface Args {
  me: boolean;
}
const deleteUserSessionResolver = async (
  obj: any,
  args: Args,
  ctx: ResolverContext
) => {
  if (args.me !== true) throw new Error("Unsupported argument value !");
  if (!ctx.res.locals.userSession) throw new Error("Unauthorized operation !");
  await ctx.prisma.session.delete({
    where: { id: ctx.res.locals.userSession.id },
  });
  ctx.res.clearCookie("userSessionId");
  return true;
};
export default deleteUserSessionResolver;
