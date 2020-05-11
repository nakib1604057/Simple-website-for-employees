const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoos = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const employee_routes = require("./routes/employee");
dotenv.config({ path: "config.env" });
mongoos.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("include"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "Employeejs",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// global variable for session
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_mssg");
  res.locals.err_msg = req.flash("err_msg");
  next();
});

const port = process.env.PORT;

app.use(employee_routes);
app.listen(port, () => {
  console.log("Server Started successfully");
});
