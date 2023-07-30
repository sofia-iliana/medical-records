const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const doctorRouter = require("./routers/doctorRouter");
const medicalEntryRouter = require("./routers/medicalEntryRouter");
var bodyParser = require("body-parser");
//require("./modules/connection");

app.use(express.json());

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({ origin: "*" }));

app.use("/", userRouter);
app.use("/", doctorRouter);
app.use("/", medicalEntryRouter);

app.listen(1212, () => {
  console.log("Server is running on 1212");
});
