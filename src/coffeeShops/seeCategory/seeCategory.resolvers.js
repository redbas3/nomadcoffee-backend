import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { name, page }) => {
      const coffeeShops = await client.category
        .findUnique({
          where: {
            name,
          },
        })
        .shops({ take: 5, skip: (page - 1) * 5 });

      return {
        coffeeShops,
      };
    },
  },
};
