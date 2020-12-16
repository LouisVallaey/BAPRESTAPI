const mongoose = require("mongoose");

const customerScheme = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  customerSince: {
    type: Date,
    required: true,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("customer", customerScheme);
