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
const server_1 = require("@apollo/server");
const queries_1 = require("./user/queries");
const mutation_1 = require("./user/mutation");
const resolver_1 = require("./user/resolver");
function createApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a GraphQL Server (Apollo Server v4)
        const gqlServer = new server_1.ApolloServer({
            typeDefs: `#graphql
        ${queries_1.queries}
        ${mutation_1.mutations}
      `,
            resolvers: resolver_1.resolvers,
        });
        // Start the Apollo server
        yield gqlServer.start();
        return gqlServer;
    });
}
exports.default = createApolloServer;
