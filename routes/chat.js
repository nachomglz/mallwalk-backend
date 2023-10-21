const { Router } = require("express");
const { postMessage } = require("../controllers/chat");

const router = Router();

router.get("/", postMessage);

module.exports = router;
