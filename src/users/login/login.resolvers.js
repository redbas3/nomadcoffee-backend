import client from "../../client";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findFirst({
          where: {
            username,
          },
        });

        if (!user) {
          return {
            ok: false,
            error: "User not found",
          };
        }

        const passwordOk = await bycrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "Incorrect password.",
          };
        }

        const token = await jwt.sign(
          { id: user.id },
          process.env.NOMADCOFFEE_SECRET_KEY
        );

        return {
          ok: passwordOk,
          token,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Login Error",
        };
      }
    },
  },
};
