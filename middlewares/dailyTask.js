const DailyTask = require("../models/dailyTask");

const loadUuidDailyTask = async (req, res, next) => {
  let dailyUuid;
  if (req.params.uuid) {
    dailyUuid = req.params.uuid;
  } else if (req.body.uuid) {
    dailyUuid = req.body.uuid;
  }

  try {
    daily = DailyTask.findOne({ _id: dailyUuid });
  } catch (error) {
    res.status(400).json({
        ok: false,
        msg: "daily does not match",
      });
  }
  if (!daily) {
    res.status(400).json({
        ok: false,
        msg: "daily does not match",
      });
  }
  console.log(daily);
  next();
};
module.exports = {
    loadUuidDailyTask,
};
