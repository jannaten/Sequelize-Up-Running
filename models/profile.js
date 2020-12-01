module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Profile;
};
