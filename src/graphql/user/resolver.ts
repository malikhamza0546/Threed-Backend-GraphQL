import { prismaClient } from "../../lib/db";
import { UserService, CreateUserPayload } from "../../services/user";

const queries = {
    // hello: () => 'Hello, world!',
    // hey: (_: any, { name }: { name: string }) => `How are you doing, ${name}?`,
    getUserToken: async (_: any, payload: { email: string, password: string }) => {
        console.log("HAmza", payload.email, payload.password);
        const token = await UserService.getUserToken({
            email: payload.email,
            password: payload.password
        })
        return token;
    },
    getCurrentLoggedInUser: async (_: any, paramters: any, context: any) => {
        console.log(context, "contextcontext");
        if (context && context.user) {
            const id = context.user.id;
            const user = await UserService.getUserById(id);
            return user;
        }
        // else {
        //     throw new ("Error user not found");
        // }

    }
};

const mutations = {
    createUser: async (
        _: any,
        payload: CreateUserPayload
    ) => {
        const res = await UserService.createUser(payload)
        return true;
    },
};

export const resolvers = {
    Query: queries,
    Mutation: mutations,
};
