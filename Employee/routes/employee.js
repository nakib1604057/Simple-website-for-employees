const express = require("express");
const router = express.Router();
const dbemployee = require("../dbmodals/employee");
router.get("/", (req, res) => {
  dbemployee
    .find({})
    .then((employees) => {
      res.render("index", { employees: employees });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/search", (req, res) => {
  let searchquery = { employeeName: req.query.searchEmployee };
  dbemployee
    .find(searchquery)
    .then((result) => {
      res.render("search", { results: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/update/employee/:id", (req, res) => {
  let searchquery = { _id: req.params.id };
  dbemployee
    .findOne(searchquery)
    .then((employee) => {
      res.render("update", { employee: employee });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.put("/update/employees/:id", (req, res) => {
  let id = req.params.id;
  let updateQuery = {
    employeeName: req.body.name,
    employeeEmail: req.body.email,
    employeeAddress: req.body.address,
    employeePhoneNumber: req.body.phone,
  };
  dbemployee
    .updateOne({ _id: id }, { $set: updateQuery })
    .then((employee) => {
      req.flash("success_mssg", "Employee Data updated successfully");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("err_msg", "There are some error");
      console.log(err);
    });
});

router.delete("/delete/employee/:id", (req, res) => {
  let id = req.params.id;
  dbemployee
    .deleteOne({ _id: id })
    .then((employee) => {
      req.flash("success_mssg", "Employee has been delete successfully");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("err_msg", "There are some error");
      console.log(err);
    });
});

router.get("/employee/new", (req, res) => {
  res.render("edit");
});

router.post("/employee/new", (req, res) => {
  insertRecode(req, res);
  // let newEmployee = {
  //   name: req.body.name,
  //   email: req.body.email,
  //   address: req.body.address,
  //   phone: req.body.phone,
  // };
  // console.log(newEmployee);
  // dbemployee
  //   .create(newEmployee)
  //   .then((employee) => {
  //     res.render("index");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});
function insertRecode(req, res) {
  var newemployeeData = new dbemployee();
  newemployeeData.employeeName = req.body.name;
  newemployeeData.employeeEmail = req.body.email;
  newemployeeData.employeeAddress = req.body.address;
  newemployeeData.employeePhoneNumber = req.body.phone;
  newemployeeData
    .save()
    .then((employee) => {
      req.flash("success_mssg", "New Employee Has Been Added Successfully");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("err_msg", "There are some error");
      console.log(err);
    });
}
module.exports = router;
