const { Schema, model } = require("mongoose");

const ScoreSchema = Schema({
  deviceId: {
    type: Schema.Types.String,
    required: [true, "DeviceId is required"],
  },
  totalpoints: {
    type: Schema.Types.Number,
    default: 0,
  },
  //   type 1
  place: {
    type: Schema.Types.Number,
    default: 0,
  },
  //   type 2
  bill: {
    type: Schema.Types.Number,
    default: 0,
  },
  //   type 3
  alltask: {
    type: Schema.Types.Number,
    default: 0,
  },
});

const PLACE = 0;
const BILL = 1;
const ALLTASK = 2;

const scoreTypes = {
  [PLACE]: "place",
  [BILL]: "bill",
  [ALLTASK]: "alltask",
};

ScoreSchema.statics.updateScore = async function (deviceId, points, add, type) {
  try {
    let score = await this.findOne({ deviceId });

    if (!score) {
      newScore = new this({
        deviceId,
      });
    }

    if (add) {
      score[scoreTypes[type]] += 1;
      newScore.totalpoints += points;
    } else {
      newScore.totalpoints -= points;
    }

    await newScore.save();
    return newScore;
  } catch (error) {
    throw error;
  }
};

module.exports = model("Score", ScoreSchema);
