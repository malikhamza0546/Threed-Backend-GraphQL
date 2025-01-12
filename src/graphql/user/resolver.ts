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
