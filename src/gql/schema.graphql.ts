import { GraphQLScalarType, Kind } from "graphql";
import GraphQLJSON from "graphql-type-json";
import { readFileSync } from "fs";
import BookResolvers from "./resolvers/booksResolver";
import AuthorsResolvers from "./resolvers/authorsResolver";

// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const BooksTypeRefs = readFileSync("./src/gql/data/books.graphql", {
  encoding: "utf-8",
});

const AuthorTypeRefs = readFileSync("./src/gql/data/authors.graphql", {
  encoding: "utf-8",
});

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value: any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const gqlResolvers = [BookResolvers, AuthorsResolvers];

const constructQueries = Object.assign(
  {},
  ...gqlResolvers.map((res) => res.Query)
);
const constructMutations = Object.assign(
  {},
  ...gqlResolvers.map((resolver) => resolver.Mutation)
);

export const typeDefs = `
  ${BooksTypeRefs}
  ${AuthorTypeRefs}
`;

export const resolvers = {
  Date: dateScalar,
  JSON: GraphQLJSON,
  Query: {
    ...constructQueries,
  },
  Mutation: {
    ...constructMutations,
  },
};
