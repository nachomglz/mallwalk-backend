const DailyTask = require("../models/dailyTask");
const Place = require("../models/place");
const Score = require("../models/score");
const { getFormattedDate } = require("../helpers/date");

const getDailyTask = async (req, res) => {
  try {
    const { deviceId } = req.query;

    const today = getFormattedDate();
    let dailytask = await DailyTask.findOne({
      deviceId,
      date: today,
    }).populate("places");

    if (!dailytask) {
      dailytask = await DailyTask.generateDailyTask(deviceId);
    }

    const checkedPlacesIds = dailytask.checkTask.map((place) =>
      place.toString()
    );

    for (const place of dailytask.places) {
      if (checkedPlacesIds.includes(place._id.toString())) {
        place["status"] = 1;
      } else {
        place["status"] = 0;
      }
    }

    res.json({
      data: dailytask,
    });
  } catch (error) {
    const { code = 500, message = "Unexpected Error" } = error;
    res.status(code).json({ code, message });
  }
};

const updateDailyTask = async (req, res) => {
  try {
    const { deviceId, placeId, taskId } = req.query;

    const task = await DailyTask.findOne({
      _id: taskId,
    });

    const place = await Place.findOne({
      _id: placeId,
    });

    if (!place) {
      throw new Error({ code: 404, message: "Daily task not found" });
    }

    task.checkTask.push(placeId);

    await Score.updateScore(deviceId, place.reward, true, 0);

    await task.save();

    res.json({
      data: task,
    });
  } catch (error) {
    const { code = 500, message = "Unexpected Error" } = error;
    res.status(code).json({ code, message });
  }
};

module.exports = {
  getDailyTask,
  updateDailyTask,
};
