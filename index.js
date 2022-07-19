const express = require("express");
const app = express();
require("dotenv").config();
const port = 8010;
const bodyParser = require("body-parser");
const helmet = require("helmet");

// const { options } = require("pg/lib/defaults");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const detailUserRoutes = require("./routes/detailUserRoutes");
const skill = require("./routes/skillRoutes");
const sosmed = require("./routes/sosmedRoutes");

// const corsOptions = {
//   origin: "http://localhost:3000",
//   // origin: "https://belajar-react-wachid.web.app",
// };

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/profiles",  express.static("profiles"));
// app.use("/images",  express.static("images"));
// Define all routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", detailUserRoutes);
app.use("/", skill);
app.use("/", sosmed);

app.use("*", (req, res) => {
  res.send("sukses");
});

app.listen(port, () => {
  console.log(`Fighting!!`);
});
