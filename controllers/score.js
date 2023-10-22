const Score = require("../models/score");

const getScore = async (req, res) => {
  try {
    const { deviceId } = req.query;
    let score = await Score.findOne({ deviceId });

    if (!score) {
      if (!score) {
        newScore = new this({
          deviceId,
        });
      }
    }

    res.json({
      data: score,
    });
  } catch (error) {
    const { code = 500, message = "Unexpected Error" } = error;
    res.status(code).json({ code, message });
  }
};

module.exports = {
  getScore,
};
