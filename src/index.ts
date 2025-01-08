import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

async function init() {
    // Middleware to parse JSON bodies
    app.use(express.json());

    // Create a GraphQL Server (Apollo Server v4)
    const gqlServer = new ApolloServer({
        typeDefs: `
      type Query {
        hello: String,
        hey(name:String):String
      }  
    `,
        resolvers: [
            {
                Query: {
                    hello: () => 'Hello, world!',
                    hey: (_, { name }: { name: String }) => `how are you doing ${name}`
                },
            },
        ],
    });

    // Start the Apollo server
    await gqlServer.start();

    // Root route for testing
    app.get("/", (req, res) => {
        res.json({ message: "Server is running" });
    });

    // Apply Apollo Server's expressMiddleware
    // This is the key part that enables the GraphQL endpoint
    app.use("/graphql", expressMiddleware(gqlServer));  // Correct usage

    // Start the Express server
    app.listen(PORT, () => console.log(`Server started at Port ${PORT}`));
}

init();
