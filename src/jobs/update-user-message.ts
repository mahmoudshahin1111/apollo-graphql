import * as Cron from "cron";
import dayJs from "dayjs";
import * as userDB from "../database/users";

function start() {
  var job = new Cron.CronJob("*/10 * * * * *", function () {
    userDB.getAll().forEach((user) => {
      user.message = `automated - [${dayJs().format("YYYY-MM-DD")}]`;
      console.log(`job updated user`, user.id);
    });
  });

  job.start();
  return job;
}

export default start;