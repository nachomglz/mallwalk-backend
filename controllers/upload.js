const { join } = require("path");
const fs = require("fs");

const getUpload = (req, res) => {
  try {
    const id = req.params.id;

    const pathImage = join(__dirname, "../assets", id);

    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }

    const pathNoImage = join(__dirname, "../assets/no-image.jpg");
    res.sendFile(pathNoImage);
  } catch (e) {
    console.log("Error: ", e);

    return res.json({
      ok: false,
      error: e,
    });
  }
};

module.exports = {
  getUpload,
};
