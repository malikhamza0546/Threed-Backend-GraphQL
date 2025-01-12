import { ApolloServer } from '@apollo/server';
import { prismaClient } from "../lib/db";
import { queries } from "./user/queries";
import { mutations } from "./user/mutation";
import { resolvers } from "./user/resolver";

async function createApolloServer() {
    // Create a GraphQL Server (Apollo Server v4)
    const gqlServer = new ApolloServer({
        typeDefs: `#graphql
        ${queries}
        ${mutations}
      `,
        resolvers: resolvers,
    });

    // Start the Apollo server
    await gqlServer.start();

    return gqlServer;

}

export default createApolloServer;