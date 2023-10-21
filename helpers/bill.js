const vision = require("@google-cloud/vision");

const processBill = async (billPath) => {
  const clientOptions = {
    apiEndpoint: process.env.GC_API_ENDPOINT,
    keyFilename: process.env.GC_KEY_PATH,
  };

  const client = new vision.ImageAnnotatorClient(clientOptions);

  const [result] = await client.textDetection(billPath);
  const labels = result.textAnnotations;

  return labels[0].description;
};

module.exports = {
  processBill,
};
