const { Router } = require("express");
const { storeGet, storePost, storeDelete } = require("../controllers/store");

const router = Router();

router.get("/", storeGet);

module.exports = router;
