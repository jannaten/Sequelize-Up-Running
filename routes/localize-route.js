const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new", (req, res) => {
  db.Localize.create({
    localeKey: req.body.localeKey,
    ProductId: req.body.ProductId,
  }).then((newLocalize) => res.send(newLocalize));
});

router.get("/all", (req, res) => {
  db.Localize.findAll({
    include: [
      { model: db.LocalizedValue, include: [{ model: db.Localization }] },
    ],
  })
    .then((allLocalize) => res.send(allLocalize))
    .catch((e) => console.log(e.message));
});

module.exports = router;
