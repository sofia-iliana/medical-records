const mongoose = require("mongoose");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const db = mongoose
  .connect(
    "mongodb+srv://sofiailiana:sofia@cluster0.z3lhgfp.mongodb.net/medicalRecords?retryWrites=true&w=majority",
    connectionParams
  )
  .then(() => {
    console.log(`Connected to MongoDB database`);
  })
  .catch((err) => console.log("Error connecting to the database", err));

module.exports = db;
