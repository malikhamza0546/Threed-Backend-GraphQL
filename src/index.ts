import express from "express";
import { expressMiddleware } from '@apollo/server/express4';
import createApolloServer from "./graphql";
import { UserService } from "./services/user";
const app = express();
const PORT = Number(process.env.PORT) || 8000;

async function init() {
    // Middleware to parse JSON bodies
    app.use(express.json());

    const gqlServer = await createApolloServer();
    app.use("/graphql", expressMiddleware(gqlServer, {
        context: async ({ req }) => {


            // @ts-ignore
            const token = req.headers["token"]
            try {
                const user = UserService.decodeJWT(token as string);
                return { user }
            }
            catch (error) {
                return {}
            }

        }
    }));  // Correct usage




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
