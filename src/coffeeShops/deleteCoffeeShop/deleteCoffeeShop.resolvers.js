import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const resolverFn = async (_, { id }, { loggedInUser }) => {
  try {
    const oldCoffeeShop = await client.coffeeShop.findFirst({
      where: {
        id,
        user: loggedInUser,
      },
      include: {
        categories: true,
        photos: true,
      },
    });

    if (!oldCoffeeShop) {
      return {
        ok: false,
        error: "CoffeeShop not found",
      };
    }

    const result = await client.coffeeShop.delete({
      where: {
        id,
      },
    });

    if (result) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: "Can't delete",
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: `error: ${error}`,
    };
  }
};

export default {
  Mutation: {
    deleteCoffeeShop: protectedResolver(resolverFn),
  },
};
