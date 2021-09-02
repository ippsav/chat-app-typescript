import { ResolverContext } from "#root/graphql/types";

interface Args {
  me: boolean;
}

const userSessionResolver = (
  obj: any,
  args: Args,
  { res }: ResolverContext
) => {
  if (args.me !== true) throw new Error("Unsupported argument value");
  return res.locals.userSession;
};

export default userSessionResolver;
