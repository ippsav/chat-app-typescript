import { createClient } from "urql";

const client = createClient({
  url: `${process.env.REDDIT_SERVER_URI}/graphql`,
  fetchOptions: {
    credentials: "include",
  },
});

export default client;
