const { Schema, model } = require("mongoose");

const PlaceSchema = Schema({
  location: {
    longitude: {
      type: Schema.Types.Number,
    },
    latitude: {
      type: Schema.Types.String,
    },
  },
  img: {
    type: Schema.Types.String,
    required: [true, "Img is required"],
  },
  status: {
    type: Schema.Types.Number,
    default: 0,
  },
  date: {
    type: Schema.Types.String,
    default: () => new Date().toISOString().split("T")[0],
  },
  category: [
    {
      type: Schema.Types.String,
    },
  ],
});

DailyTaskSchema.statics.PlaceSchema = async (deviceId) => {
  try {
  } catch (error) {
    throw error;
  }
};

module.exports = model("Place", PlaceSchema);
