"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = require("../../services/user");
const queries = {
    // hello: () => 'Hello, world!',
    // hey: (_: any, { name }: { name: string }) => `How are you doing, ${name}?`,
    getUserToken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield user_1.UserService.getUserToken({
            email: payload.email,
            password: payload.password
        });
        return token;
    }),
    getCurrentLoggedInUser: (_, paramters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const id = context.user.id;
            const user = yield user_1.UserService.getUserById(id);
            return user;
        }
        // else {
        //     throw new ("Error user not found");
        // }
    })
};
const mutations = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_1.UserService.createUser(payload);
        return true;
    }),
};
exports.resolvers = {
    Query: queries,
    Mutation: mutations,
};
