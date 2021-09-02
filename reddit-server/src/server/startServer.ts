import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import accessEnv from "#root/helpers/accessEnv";
import schema from "#root/graphql/schema";
import resolvers from "#root/graphql/resolvers";

import formatGQLError from "./formatGQLError";
import prisma from "#root/db/prismaClient";
import injectSession from "./middleware/injectSession";

const PORT = accessEnv<number>("PORT", 7000);

const startServer = async () => {
  const apolloServer = new ApolloServer({
    context: ({ req, res }) => ({ req, res, prisma }),
    formatError: formatGQLError,
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  const app = express();
  app.use(
    cors({
      origin: (origin, cb) => cb(null, true),
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(injectSession);
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });
  app.listen(PORT, "0.0.0.0", () => {
    console.info(`reddit-server running on port ${PORT}`);
  });
};

export default startServer;
