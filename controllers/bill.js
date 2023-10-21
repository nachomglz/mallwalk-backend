const Bill = require("../models/bill");
const { join } = require("path");
const { randomUUID } = require("crypto");
const { uploadFile } = require("../helpers/file");
const { processBill } = require("../helpers/bill");

const uploadBill = async (req, res) => {
  try {
    if (req.files.length === 0) {
      return res.json({
        ok: false,
        error: "File not upload",
      });
    }

    const { file } = req.files;

    const shortName = file.name.split(".");
    const extension = shortName[shortName.length - 1];
    const fileName = randomUUID() + "." + extension;
    const filePath = join(__dirname, "../assets/", fileName);

    await uploadFile(file, filePath);

    const processedText = await processBill(filePath);

    return res.json({
      ok: true,
      data: processedText,
    });
  } catch (e) {
    console.log("Error: ", e);

    return res.json({
      ok: false,
      error: e,
    });
  }
};

const getBills = async (req = request, res) => {
  try {
    const bills = await Bill.find({ status: true });

    console.log(bills);

    return res.json({
      ok: true,
      data: bills,
    });
  } catch (e) {
    console.log("Error: ", e);

    return res.json({
      ok: false,
      error: e,
    });
  }
};

const getBillsByDevice = async (req = request, res) => {
  try {
    const device = req.header("device");

    if (!device) {
      return res.json({
        ok: false,
        error: "Device is missing",
      });
    }

    const bills = await Bill.find({ device, status: true });

    return res.json({
      ok: true,
      data: bills,
    });
  } catch (e) {
    console.log("Error: ", e);

    return res.json({
      ok: false,
      error: e,
    });
  }
};

const getBillById = async (req, res) => {
  try {
    const id = req.params.id;

    const bill = await Bill.findById(id);

    if (!bill) {
      return res.json({
        ok: false,
        error: "Bill not found",
      });
    }

    return res.json({
      ok: true,
      data: bill,
    });
  } catch (e) {
    console.log("Error: ", e);

    return res.json({
      ok: false,
      error: e,
    });
  }
};

const deleteBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const bill = await Bill.findByIdAndDelete(
      id,
      { status: false },
      { new: true }
    );

    if (!bill) {
      return res.json({
        ok: false,
        error: "Bill not found",
      });
    }

    res.json({
      ok: true,
      data: bill,
    });
  } catch (e) {
    console.log("Error: ", e);

    return res.json({
      ok: false,
      error: e,
    });
  }
};

module.exports = {
  deleteBillById,
  getBillById,
  getBillsByDevice,
  getBills,
  uploadBill,
};