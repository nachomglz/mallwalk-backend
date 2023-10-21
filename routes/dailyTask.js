const { Router } = require("express");
const { getDailyTask } = require("../controllers/dailytask");

const router = Router();

router.get("/", getDailyTask);

module.exports = router;
