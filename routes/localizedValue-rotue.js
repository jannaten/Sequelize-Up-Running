const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new", (req, res) => {
  db.LocalizedValue.create({
    localizedValue: req.body.localizedValue,
    LocalizationId: req.body.LocalizationId,
    LocalizeId: req.body.LocalizeId,
  }).then((newLocalization) => res.send(newLocalization));
});

router.get("/all", (req, res) => {
  db.LocalizedValue.findAll({
    // include: [db.Localization],
  }).then((allLocalizedValue) => res.send(allLocalizedValue));
});

module.exports = router;
