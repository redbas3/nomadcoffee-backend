import fs from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShops.utils";

const resolverFn = async (
  _,
  { id, name, latitude, longitude, categories, photo },
  { loggedInUser }
) => {
  let photoUrl = null;
  if (photo) {
    const { filename, createReadStream } = await photo;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = fs.createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    photoUrl = `http://localhost:4000/static/${newFilename}`;
  }

  const oldCoffeeShop = await client.coffeeShop.findFirst({
    where: { id },
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
    data: {
      name,
      latitude,
      longitude,
      ...(categories && {
        categories: {
          disconnect: oldCoffeeShop.categories,
          connectOrCreate: processCategories(categories),
        },
      }),
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
