import startServer from "./server/startServer";

startServer().catch((err) => {
  console.error(err);
});
