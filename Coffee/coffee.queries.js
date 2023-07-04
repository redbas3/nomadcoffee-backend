import client from "../client";

export default {
  Query: {
    coffees: () => client.coffee.findMany(),
  },
};
