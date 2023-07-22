const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const doctorRouter = require("./routers/doctorRouter");
//require("./modules/connection");

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/", userRouter);
app.use("/", doctorRouter);

app.listen(1212, () => {
  console.log("Server is running on 1212");
});
