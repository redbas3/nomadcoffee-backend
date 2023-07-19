import client from "../client";

export default {
  CoffeeShop: {
    categories: ({ id }) =>
      client.category.findMany({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      }),
  },
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
