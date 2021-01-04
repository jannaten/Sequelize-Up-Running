const express = require("express");
const router = express.Router();
const db = require("../models");
const { QueryTypes } = require("sequelize");

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
router.get("/a", (req, res) => {
  db.sequelize
    .query(
      "select o.id as OrganizationId, o.*, p.id as ProductId, p.* from Organizations o left join OrganizationProducts op on o.id = op.OrganizationId left join Products p on p.id = op.ProductId"
    )
    .then((allLocalize) => res.send(allLocalize))
    .catch((e) => console.log(e.message));
});

router.get("/localizedValues/:orgId/:proId", (req, res) => {
  const { orgId, proId } = req.params;
  db.Localize.findAll({
    where: { ProductId: proId },
    include: [
      {
        model: db.LocalizedValue,
        include: [{ where: { OrganizationId: orgId }, model: db.Localization }],
      },
    ],
  })
    .then((allLocalize) => {
      let arr = [];
      for (let i = 0; i < allLocalize.length; i++) {
        let localizedValues = {};
        let obj = {};
        let org = {};
        let key = {
          id: allLocalize[i].dataValues.id,
          productId: allLocalize[i].dataValues.ProductId,
          key: allLocalize[i].dataValues.localeKey,
        };

        allLocalize[i].dataValues.LocalizedValues.map((el) => {
          //   if (el.dataValues.Localization.dataValues.OrganizationId === 1) {
          if (orgId === "1") {
            obj[el.dataValues.Localization.dataValues.locale] = {
              fromDefault: true,
              id: el.id,
              value: el.localizedValue,
              localizationId: el.LocalizationId,
            };
            org.organizationId =
              el.dataValues.Localization.dataValues.OrganizationId;
          } else {
            obj[el.dataValues.Localization.dataValues.locale] = {
              fromDefault: false,
              id: el.id,
              value: el.localizedValue,
              localizationId: el.LocalizationId,
            };
            org.organizationId =
              el.dataValues.Localization.dataValues.OrganizationId;
          }
        });
        localizedValues.organizationId = org.organizationId;
        localizedValues.key = key;
        localizedValues.values = obj;
        arr.push(localizedValues);
      }
      const newArr = arr.filter((el) => el.organizationId !== undefined);
      res.send(newArr);
    })
    .catch((e) => console.log(e.message));
});

module.exports = router;
