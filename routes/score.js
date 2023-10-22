const { Router } = require("express");
const { getScore } = require("../controllers/score");

const router = Router();

router.get("/", getScore);

module.exports = router;
