const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new", (req, res) => {
  db.Product.create({
    name: req.body.name,
  }).then((newProduct) => res.send(newProduct));
});

router.get("/all", (req, res) => {
  db.Product.findAll().then((allProduct) => res.send(allProduct));
});

module.exports = router;
