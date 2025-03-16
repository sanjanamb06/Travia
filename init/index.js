const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wander");
}

main()
  .then(() => {
    console.log("Connection success");
  })
  .catch((err) => console.log(err));

const initDb = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67cb260b7ea52b1b933be55c",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data initialized");
};
initDb();
