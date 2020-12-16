const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new", (req, res) => {
  db.Localization.create({
    name: req.body.name,
    locale: req.body.locale,
    ProductId: req.body.ProductId,
    OrganizationId: req.body.OrganizationId,
  }).then((newLocalization) => res.send(newLocalization));
});

router.get("/all", (req, res) => {
  db.Localization.findAll().then((allLocalization) =>
    res.send(allLocalization)
  );
});

module.exports = router;
