const { Router } = require("express");
const { getDailyTask, updateDailyTask } = require("../controllers/dailytask");

const router = Router();

router.get("/", getDailyTask);
router.post("/", updateDailyTask);

module.exports = router;
