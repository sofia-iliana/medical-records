const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const doctorRouter = require("./routers/doctorRouter");
const medicalEntryRouter = require("./routers/medicalEntryRouter");
const accessibilityRouter = require("./routers/accessibilityRouter");
var bodyParser = require("body-parser");
//require("./modules/connection");

app.use(express.json());

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({ origin: "https://medical-records-minp.onrender.com" }));

app.use("/", userRouter);
app.use("/", doctorRouter);
app.use("/", medicalEntryRouter);
app.use("/", accessibilityRouter);

app.listen(1212, () => {
  console.log("Server is running on 1212");
});
