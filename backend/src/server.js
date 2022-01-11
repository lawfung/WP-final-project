import { GraphQLServer, PubSub } from "graphql-yoga";

// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
// db
import userDatabase from "./models/user.js";
import cookieDatabase from "./models/cookie.js";
import recordDatabase from "./models/record.js";
import strategyDatabase from "./models/strategy.js";

const pubSub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation
  },
  context: {
    userDatabase,
    cookieDatabase,
    recordDatabase,
    strategyDatabase,
    pubSub,
  },
});

export default server;