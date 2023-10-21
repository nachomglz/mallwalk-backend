const { Router } = require("express");
const { storeGet, storePost, storeDelete } = require("../controllers/store");

const router = Router();

router.get("/", storeGet);
router.post("/", storePost);

module.exports = router;
