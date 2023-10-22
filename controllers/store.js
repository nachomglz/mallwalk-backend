const { response, request } = require("express");
const Store = require("../models/store");

const storeGet = async (req = request, res = response) => {
  try {
    const [total, store] = await Promise.all([
      Store.countDocuments(),
      Store.find(),
    ]);
    res.json({
      ok: true,
      total,
      store,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
      error: error,
    });
  }
};

const storePost = async (req, res) => {
  const { body } = req;
  const store = new Store(body);
  try {
    await store.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
      error: error,
    });
  }
  res.status(200).json({
    ok: true,
    store,
  });
};



module.exports = {
  storeGet,
  storePost,
};
