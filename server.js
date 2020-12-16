const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productRoute = require("./routes/product-route");
const localizeRoute = require("./routes/localize-route");
const organizationRoute = require("./routes/organization-route");
const localizationRoute = require("./routes/localization-route");
const localizedValueRoute = require("./routes/localizedValue-rotue");

app.use("/api/product", productRoute);
app.use("/api/localize", localizeRoute);
app.use("/api/organization", organizationRoute);
app.use("/api/localization", localizationRoute);
app.use("/api/localizedValue", localizedValueRoute);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
});

// "operatorsAliases" : 0
