const { Schema, model } = require("mongoose");

const BillSchema = new Schema(
  {
    device: {
      type: String,
      required: [true, "The device is required"],
    },
    date: {
      type: Date,
      require: [true, "The date bill is required"],
    },
    amount: {
      type: Number,
      required: [true, "The amount bill is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

BillSchema.methods.toJSON = function () {
  const { __v, ...bill } = this.toObject();

  return bill;
};

module.exports = model("Bill", BillSchema);
