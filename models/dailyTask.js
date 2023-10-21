const { Schema, model } = require("mongoose");
const { getFormattedDate } = require("../helpers/date");
const Place = require("./place");

const DailyTaskSchema = Schema({
  deviceId: {
    type: Schema.Types.String,
    required: [true, "DeviceId is required"],
  },
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
  checkTask: [
    {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
  date: {
    type: Schema.Types.String,
    default: getFormattedDate(),
  },
});

DailyTaskSchema.statics.generateDailyTask = async function (deviceId) {
  try {
    const places = await Place.find();
    const dailytask = new this({
      deviceId,
      places,
    });
    await dailytask.save();

    return dailytask;
  } catch (error) {
    throw error;
  }
};

module.exports = model("DailyTask", DailyTaskSchema);
