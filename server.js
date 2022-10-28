const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("database connection succcesfull");
});

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`running on ${port}`);
});
