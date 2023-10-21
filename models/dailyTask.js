const { Schema, model } = require("mongoose");
const { getFormattedDate } = require("../helpers/date");

const DailyTaskSchema = Schema({
  deviceId: {
    type: Schema.Types.String,
    required: [true, "DeviceId is required"],
  },
  location: {
    longitude: {
      type: Schema.Types.Number,
    },
    latitude: {
      type: Schema.Types.String,
    },
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


// You can continue adding more objects with different variations.

module.exports = model("DailyTask", DailyTaskSchema);
