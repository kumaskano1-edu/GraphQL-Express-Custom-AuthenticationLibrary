const { prisma } = require("./prisma/generated/prisma-client");
const { ApolloServer } = require("apollo-server");
const { mergeTypes } = require("merge-graphql-schemas");
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");

//Importing TypeDefs
const typeDefs = importSchema("./typeDefs/Authorization.graphql");
//Importing Resolvers
const resolvers = require("./resolvers/Authentication.js");
//Creating the schema
const PORT = process.env.PORT || 6000;
const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
//create server
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, prisma }),
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
