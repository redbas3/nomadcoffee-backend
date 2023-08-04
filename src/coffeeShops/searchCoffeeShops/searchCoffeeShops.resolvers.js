import client from "../../client";

export default {
  Query: {
    searchCoffeeShops: (_, { keyword }) =>
      client.coffeeShop.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
            {
              categories: {
                some: {
                  name: {
                    contains: keyword,
                  },
                },
              },
            },
          ],
        },
        include: {
          categories: true,
          photos: true,
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
