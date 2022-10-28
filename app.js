const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { query } = require("express");
app.use(express.json());
app.use(cors());
const productRouter = require("./router/Product.router");

app.use("/api/v1/product", productRouter);

module.exports = app;
