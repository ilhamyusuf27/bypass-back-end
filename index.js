const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8010;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

// const { options } = require("pg/lib/defaults");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const detailUserRoutes = require("./routes/detailUserRoutes");
const skillRoutes = require("./routes/skillRoutes");
const sosmedRoutes = require("./routes/sosmedRoutes");
const portofolioRoutes = require("./routes/portofolioRoutes");
const jobExperienceRoutes = require("./routes/jobExperienceRoutes");
const companyRoutes = require("./routes/companyRoutes");
const hireRouter = require("./routes/hireRoutes");

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "https://my-career-32e87.web.app/",
};

// app.use(cors())

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/profiles", express.static("profiles"));
app.use("/images", express.static(`images`));
app.use("/company", express.static(`company`));
// Define all routes
app.use("/", cors(corsOptions), companyRoutes);
app.use("/", cors(corsOptions), authRoutes);
app.use("/", cors(corsOptions), userRoutes);
app.use("/", cors(corsOptions), detailUserRoutes);
app.use("/", cors(corsOptions), skillRoutes);
app.use("/", cors(corsOptions), sosmedRoutes);
app.use("/", cors(corsOptions), portofolioRoutes);
app.use("/", cors(corsOptions), jobExperienceRoutes);
app.use("/", cors(corsOptions), hireRouter);

app.use("*", (req, res) => {
  res.send("sukses");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("fighting", port);
});
