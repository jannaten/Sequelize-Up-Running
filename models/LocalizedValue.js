module.exports = (sequelize, DataTypes) => {
  const LocalizedValue = sequelize.define("LocalizedValue", {
    localizedValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  LocalizedValue.associate = (models) => {
    LocalizedValue.belongsTo(models.Localization, {
      foreignKey: {
        allowNull: false,
      },
    });
    LocalizedValue.belongsTo(models.Localize, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return LocalizedValue;
};
