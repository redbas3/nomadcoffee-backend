import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories, processCategoriesId } from "../coffeeShops.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  { id, name, latitude, longitude, categories, photo },
  { loggedInUser }
) => {
  let photoUrl = null;
  if (photo) {
    photoUrl = await uploadToS3(photo, loggedInUser.id, "photos");
  }

  const oldCoffeeShop = await client.coffeeShop.findFirst({
    where: { id, userId: loggedInUser.id },
    include: {
      categories: true,
    },
  });
  if (!oldCoffeeShop) {
    return {
      ok: false,
      error: "CoffeeShop not found",
    };
  }

  await client.coffeeShop.update({
    where: {
      id,
    },
    select: {
      categories: true,
      id: true,
    },
    data: {
      name,
      latitude,
      longitude,
      categories: {
        disconnect: processCategoriesId(oldCoffeeShop.categories),
        ...(categories && {
          connectOrCreate: processCategories(categories),
        }),
      },
    },
  });

  if (photoUrl) {
    await client.coffeeShopPhoto.create({
      data: {
        shop: {
          connect: {
            id: oldCoffeeShop.id,
          },
        },
        url: photoUrl,
      },
    });
  }

  return {
    ok: true,
  };
};

export default {
  Upload: require("graphql-upload-minimal").GraphQLUpload,
  Mutation: {
    editCoffeeShop: protectedResolver(resolverFn),
  },
};
