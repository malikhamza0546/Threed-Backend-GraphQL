export const queries = `#graphql
type Query {
  getUserToken(email: String!, password: String!): String
}
`;
