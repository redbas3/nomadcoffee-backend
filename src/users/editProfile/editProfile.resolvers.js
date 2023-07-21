import fs from "fs";
import client from "../../client";
import bycrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  {
    username,
    email,
    name,
    location,
    password: newPassword,
    avatarUrl,
    githubUsername,
  },
  { loggedInUser }
) => {
  let avatarNewUrl = null;
  if (avatarUrl) {
    avatarNewUrl = await uploadToS3(avatarUrl, loggedInUser.id, "avatars");
  }

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bycrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      username,
      email,
      name,
      location,
      githubUsername,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarNewUrl && { avatarUrl: avatarNewUrl }),
    },
  });

  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Upload: require("graphql-upload-minimal").GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
