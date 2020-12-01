const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoute = require("./routes/user-route");
const profileRoute = require("./routes/profile-route");
const postRoute = require("./routes/post-route");
app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/post", postRoute);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
});

// "operatorsAliases" : 0
