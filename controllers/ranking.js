const Score = require("../models/scores");

const geRanking = async (req, res) => {
  try {
    const raking = await Score.aggregate([
      {
        $project: {
          deviceId: 1,
          place: 1,
          bill: 1,
          alltask: 1,
          lifepoints: { $sum: ["$place", "$bill", "$alltask"] },
        },
      },
      {
        $sort: { total: 1 },
      },
    ]);

    res.json({
      data: raking,
    });
  } catch (error) {
    const { code = 500, message = "Unexpected Error" } = error;
    res.status(code).json({ code, message });
  }
};

module.exports = {
  geRanking,
};
