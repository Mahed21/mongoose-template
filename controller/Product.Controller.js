const Product = require("../model/Product");
exports.getProduct = async (req, res) => {
  try {
    //get all product
    const product = await Product.find({});

    //get product by Id
    // const product = await Product.find({ _id: "635b50150ecaca72c83cbda7" });

    //check by multiple property
    // const product = await Product.find({
    //   _id: "635b50150ecaca72c83cbda7",
    //   name: "kire",
    // });

    // using Or operator
    // const product = await Product.find({
    //   $or: [{ _id: "635b50150ecaca72c83cbda7" }, { name: "kidfre" }],
    // });

    //not operator
    // const product = await Product.find({ status: { $ne: "out-stock" } });

    //greater than
    // const product = await Product.find({ quantity: { $gt: 100 } });

    //greater than or equal

    // const product = await Product.find({ quantity: { $gte: 100 } });

    //in operator
    // const product = await Product.find({ quantity: { $in: ["chal", "dhal"] } });

    //find specific property
    // const product = await Product.find({}, "name quantity");

    //find without some property
    // const product = await Product.find({}, "-name -quantity");

    //user limit
    //const product = await Product.find({}).limit(2);

    //sort decending
    // const product = await Product.find({}).sort({ quantity: -1 });

    //sort assending
    // const product = await Product.find({}).sort({ quantity: 1 });

    //where]
    // const product = await Product.where("name")
    //   .equals("kidllfre")
    //   .where("price")
    //   .gte(100);

    res.status(200).json({
      status: "success",
      message: "data get Successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data fail to get",
      data: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // if use create
    // const result=await Product.create(req.body)
    // if use save
    const product = new Product(req.body);
    // if (product.quantity == 0) {
    //   product.status = "out-stock";
    // }
    const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "data inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data not inserted Successfully",
      data: error.message,
    });
  }
};

exports.updateContorller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Product.updateOne(
      { _id: id },
      { $set: req.body },
      //  increament any thing req.body
      // { $inc: req.body },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to update",
      data: error.message,
    });
  }
};

exports.updateProductMany = async (req, res, next) => {
  try {
    //one way
    // const result = await Product.updateMany(
    //   { _id: req.body.ids },
    //   req.body.data,
    //   {
    //     runValidators: true,
    //   }
    // );

    //another way

    const products = [];
    req.body.ids.forEach((element) => {
      products.push(Product.updateOne({ _id: element.id }, element.data));
    });
    const result = await Promise.all(products);
    res.status(200).json({
      status: "success",
      message: "updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "fail to update",
      data: error.message,
    });
  }
};
