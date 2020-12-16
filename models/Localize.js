module.exports = (sequelize, DataTypes) => {
  const Localize = sequelize.define("Localize", {
    localeKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Localize.associate = (models) => {
    Localize.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });

    Localize.hasMany(models.LocalizedValue, {
      onDelete: "cascade",
    });
  };

  return Localize;
};
