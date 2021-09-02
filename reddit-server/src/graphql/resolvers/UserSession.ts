import { Session } from "@prisma/client";
import { ResolverContext } from "../types";

const UserSession = {
  user: async (userSession: Session, _: any, { prisma }: ResolverContext) => {
    return await prisma.user.findUnique({
      where: {
        id: userSession.userId,
      },
    });
  },
};
export default UserSession;
