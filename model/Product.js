const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      trim: true,
      unique: true,
      minLength: [3, "minimum should have 3 letter"],
      maxnLength: [100, "maximum should have 100 letter"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price cant be negetive"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "must be kg/litre,pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity cant be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "quantity must be integer",
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-stock", "discontinued"],
        message: "status cant be out of these",
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref:"supplier"
    // },
  },
  { timestamps: true }
);

// schema->model->query
//mogoose middleware 1. pre 2.post
productSchema.pre("save", function (next) {
  console.log("before save data");
  if (this.quantity == 0) {
    this.status = "out-stock";
  }
  next();
});
productSchema.post("save", function (doc, next) {
  console.log("after save");
  next();
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
