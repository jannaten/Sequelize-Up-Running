const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new", (req, res) => {
  db.Organization.create({
    orgname: req.body.orgname,
  }).then((newOrganization) => res.send(newOrganization));
});

router.get("/all", (req, res) => {
  db.Organization.findAll().then((allOrganization) =>
    res.send(allOrganization)
  );
});

module.exports = router;
