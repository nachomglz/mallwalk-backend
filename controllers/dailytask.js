const DailyTask = require("../models/dailyTask");
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

const postDailyTask = async (req, res) => {
  const { body } = req;
  const dailyTask = new DailyTask(body);
  try {
    await dailyTask.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
      error: error,
    });
  }
  res.json({
    data: { dailyTask}
  })


}

module.exports = {
  getDailyTask,
  postDailyTask
};
