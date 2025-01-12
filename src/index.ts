import express from "express";
import { expressMiddleware } from '@apollo/server/express4';
import createApolloServer from "./graphql";
const app = express();
const PORT = Number(process.env.PORT) || 8000;

async function init() {
    // Middleware to parse JSON bodies
    app.use(express.json());

    const gqlServer = await createApolloServer();
    app.use("/graphql", expressMiddleware(gqlServer));  // Correct usage




    // Root route for testing
    app.get("/", (req, res) => {
        res.json({ message: "Server is running" });
    });

    // Apply Apollo Server's expressMiddleware
    // This is the key part that enables the GraphQL endpoint


    // Start the Express server
    app.listen(PORT, () => console.log(`Server started at Port ${PORT}`));
}

init();
