import { GraphQLError } from "graphql";

const formatGQLError = (error: GraphQLError) => {
  return { message: error.message };
};

export default formatGQLError;
