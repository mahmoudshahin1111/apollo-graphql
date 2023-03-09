import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./database/database";
import updateUserMessageJobStart from "./jobs/update-user-message";
import { userService } from "./resolvers/users";

// initialize the resolvers
const resolvers = {
  Query: {
    getUser: userService.getUser,
  },

  Mutation: {
    updateUser: userService.updateUser,
  },
};

// running jobs
updateUserMessageJobStart();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

  startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({url})=>{
  console.log(`🚀  Server ready at: ${url}`);
});


