import fs from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShops.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  { name, latitude, longitude, categories, photo },
  { loggedInUser }
) => {
  let photoUrl = null;
  if (photo) {
    photoUrl = await uploadToS3(photo, loggedInUser.id, "photos");
  }

  const coffeeShop = await client.coffeeShop.create({
    data: {
      name,
      latitude,
      longitude,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      ...(categories && {
        categories: { connectOrCreate: processCategories(categories) },
      }),
    },
  });

  if (photoUrl) {
    await client.coffeeShopPhoto.create({
      data: {
        shop: {
          connect: {
            id: coffeeShop.id,
          },
        },
        url: photoUrl,
      },
    });
  }

  if (coffeeShop) {
    return {
      ok: true,
      id: coffeeShop.id,
    };
  }
};

export default {
  Upload: require("graphql-upload-minimal").GraphQLUpload,
  Mutation: {
    createCoffeeShop: protectedResolver(resolverFn),
  },
};
