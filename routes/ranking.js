const { Router } = require("express");
const { geRanking } = require("../controllers/ranking");

const router = Router();

router.get("/", geRanking);

module.exports = router;
