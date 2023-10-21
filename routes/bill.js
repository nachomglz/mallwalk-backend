const { Router } = require("express");
const { getBillById, getBills, deleteBillById, getBillsByDevice, uploadBill } = require("../controllers/bill");

const router = Router(); 

router.get("/:id", getBillById);
router.get("/all", getBills);
router.get("/", getBillsByDevice);
router.delete("/:id", deleteBillById);
router.post("/upload", uploadBill);

module.exports = router;