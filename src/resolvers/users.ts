import { getOne, IUser } from "../database/users";
import * as UsersDB from "../database/users";
import _ from "lodash";
import logger from "../utils/logger";
import { GraphQLError } from "graphql";
import axios from "axios";

const getUser = async (parent, args: { id: string }) => {
  try {
    const response = await axios.get(
      "https://random-data-api.com/api/v2/users"
    );
    if (response.status !== 200) {
      return [];
    }
    let user = (await response.data) as IUser;
    const existUser = UsersDB.getOne(args.id);
    if (!existUser) {
      UsersDB.createOne(
        _.pick(user, [
          "id",
          "uid",
          "first_name",
          "last_name",
          "username",
          "email",
        ]) as IUser
      );
    }
    return existUser || user;
  } catch (error) {
    logger.log({
      level: "error",
      message: error,
    });
    throw new GraphQLError("failed to fetch the user");
  }
};

const updateUser = async (parent, args: { id: string; message: string }) => {
  try {
    let existUser: IUser = getOne(args.id);
    if (!existUser) {
      throw new GraphQLError("user doesn't exists");
    }
    if (args.message) {
      UsersDB.update(_.toString(args.id), {
        message: `manual - ${args.message}`,
      } as IUser);
    }
    return existUser;
  } catch (error) {
    logger.log({
      level: "error",
      message: error,
    });
    throw new GraphQLError("fails to update the user");
  }
};

export const userService = {
  getUser,
  updateUser,
};
