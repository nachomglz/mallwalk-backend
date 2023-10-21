const { Router } = require("express");
const { getDailyTask, postDailyTask } = require("../controllers/dailytask");
const {loadUuidDailyTask} = require("../middlewares/dailyTask")
const { checkLocation } = require("../validators/dayliTask")

const router = Router();

router.get("/", getDailyTask);

router.put("/:uuid",loadUuidDailyTask, postDailyTask);

module.exports = router;
