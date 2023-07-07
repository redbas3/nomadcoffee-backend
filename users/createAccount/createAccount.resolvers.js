import client from "../../client";
import bycrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, githubUsername }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });

        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }

        const uglyPassword = await bycrypt.hash(password, 10);
        return client.user.create({
          data: {
            username,
            email,
            name,
            location,
            githubUsername,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};
