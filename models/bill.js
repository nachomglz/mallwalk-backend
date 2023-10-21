const { Schema, model } = require("mongoose");

const BillSchema = new Schema(
  {
    device: {
      type: String,
      required: [true, "The device is required"],
    },
    amount: {
      type: Number,
      required: [true, "The amount bill is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
      required: [true, "The url bill is required"],
    },
    storeName: {
      type: String,
      required: [true, "The store name is required"],
    },
    shoppingDate: {
      type: String,
      require: [true, "The date bill is required"],
    },
  },
  { timestamps: true }
);

BillSchema.methods.toJSON = function () {
  const { __v, status, ...bill } = this.toObject();

  return bill;
};

module.exports = model("Bill", BillSchema);
