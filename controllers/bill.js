const Bill = require("../models/bill");

const uploadBill = async (req, res) => {
  try {
    const device = req.header("device");





    const bill = new Bill({ amount, device, date });

    await bill.save();

    return res.json({
      ok: true,
      data: bill,
    });
  } catch (error) {
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

    return res.json({
      ok: true,
      data: bills,
    });
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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

// const processBill = async (req, res) => {
//   const clientOptions = {
//     apiEndpoint: "eu-vision.googleapis.com",
//     keyFilename: "../mallwalk-app-8b093e57dcc8.json",
//   };

//   const client = new vision.ImageAnnotatorClient(clientOptions);

//   const [result] = await client.textDetection(
//     "/Users/vemiliogp/Downloads/mallwalk-backend/assets/bill.jpeg"
//   );
//   const detections = result.textAnnotations;

//   res.json({
//     detections,
//   });
// };

module.exports = {
  deleteBillById,
  getBillById,
  getBillsByDevice,
  getBills,
  uploadBill
};
