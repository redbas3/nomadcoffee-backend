import client from "../../client";

const PAGE_COUNT = 12;

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      const coffeeShops = await client.coffeeShop.findMany({
        take: PAGE_COUNT,
        skip: (page - 1) * PAGE_COUNT,
        include: {
          categories: true,
          photos: true,
          user: true,
        },
      });

      const totalCoffeesShop = await client.coffeeShop.count();

      return {
        ok: true,
        coffeeShops,
        totalPages: Math.ceil(totalCoffeesShop / PAGE_COUNT),
      };
    },
  },
};
