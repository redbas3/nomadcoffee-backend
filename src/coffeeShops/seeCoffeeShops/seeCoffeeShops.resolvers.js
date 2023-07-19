import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      const coffeeShops = await client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
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
        totalPages: Math.ceil(totalCoffeesShop / 5),
      };
    },
  },
};
