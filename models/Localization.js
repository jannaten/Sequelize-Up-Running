module.exports = (sequelize, DataTypes) => {
  const Localization = sequelize.define("Localization", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Localization.associate = (models) => {
    Localization.belongsTo(models.Organization, {
      foreignKey: {
        allowNull: false,
      },
    });
    Localization.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
    Localization.hasMany(models.LocalizedValue, {
      onDelete: "cascade",
    });
  };
  return Localization;
};
