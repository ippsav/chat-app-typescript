import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export interface ResolverContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}
