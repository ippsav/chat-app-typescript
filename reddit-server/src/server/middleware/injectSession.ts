import prisma from "#root/db/prismaClient";
import { NextFunction, Request, Response } from "express";

const injectSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.userSessionId) {
    const userSession = await prisma.session.findUnique({
      where: { id: req.cookies.userSessionId },
    });
    res.locals.userSession = userSession;
  }
  next();
};

export default injectSession;
