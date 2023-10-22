const { Router } = require("express");
const { getUpload } = require("../controllers/upload");

const router = Router(); 

router.get("/:id", getUpload);

module.exports = router;