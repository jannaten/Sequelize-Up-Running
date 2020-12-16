const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new/:orgId/:proId", (req, res) => {
  db.OrganizationProduct.create({
    OrganizationId: req.params.orgId,
    ProductId: req.params.proId,
  }).then((newOrganizationProduct) => res.send(newOrganizationProduct));
});

router.get("/all", (req, res) => {
  db.OrganizationProduct.findAll().then((allOrganizationProduct) =>
    res.send(allOrganizationProduct)
  );
});

router.get("/find/:orgId", (req, res) => {
  db.OrganizationProduct.findAll({
    where: { OrganizationId: req.params.orgId },
    include: [db.Organization, db.Product],
  }).then((allOrganizationProduct) => res.send(allOrganizationProduct));
});

module.exports = router;
