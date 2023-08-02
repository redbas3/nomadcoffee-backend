require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./scheme";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload-minimal";

const PORT = process.env.PORT;

async function startServer() {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    uploads: false,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });
  await apollo.start();
  apollo.applyMiddleware({ app });
}
startServer();

const app = express();
app.use(graphqlUploadExpress());
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));

app.listen({ port: PORT }, () => {
  console.log(`🍏 Server is running on http://localhost:${PORT}/`);
});
