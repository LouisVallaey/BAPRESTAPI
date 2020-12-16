const express = require("express");
const { get } = require("mongoose");
const customer = require("../models/customer");
const router = express.Router();
const Customer = require("../models/customer");
//getall
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//getCustomer
router.get("/:id", getCustomer, (req, res) => {
  res.json(res.customer);
});
//createCustomer
router.post("/", async (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//updateCustomer
router.patch("/:id", getCustomer, async (req, res) => {
  if (req.body.firstName != null) {
    res.customer.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.customer.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//deleteCustomer
router.delete("/:id", getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(400).json({ message: "Cannot find customer" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.customer = customer;
  next();
}

module.exports = router;
