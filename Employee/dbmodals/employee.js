const mongoose = require("mongoose");

let employeeSchema = new mongoose.Schema({
  employeeName: String,
  employeeEmail: String,
  employeeAddress: String,
  employeePhoneNumber: Number,
});

module.exports = mongoose.model("dbemployee", employeeSchema);
