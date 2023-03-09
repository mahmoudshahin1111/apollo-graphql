import * as Cron from "cron";
import dayJs from "dayjs";
import  logger from "../utils/logger";
import * as userDB from "../database/users";
import { IUser } from "../database/users";

function start() {
  var job = new Cron.CronJob("*/10 * * * * *", function () {
    userDB.getAll().forEach((user) => {
      const userMessage = `automated - [${dayJs().format("YYYY-MM-DD")}]`;
      userDB.update(user.id.toString(), { message: userMessage } as IUser);
      logger.log("info", `${__filename} executed on user ${user.id}`);
    });
  });

  job.start();
  return job;
}

export default start;
