import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { resolvers, typeDefs } from "./src/gql/schema.graphql";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

(async () => {
  // top level async for await
  const isProduction = process.env.NODE_ENV === "production";

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      isProduction
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
    introspection: !isProduction,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
