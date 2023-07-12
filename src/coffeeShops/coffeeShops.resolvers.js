import client from "../client";

export default {
  Category: {
    totalShops: async ({ id }) => {
      return await client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
