module.exports = (sequelize, DataTypes) => {
  const OrganizationProduct = sequelize.define("OrganizationProduct");

  OrganizationProduct.associate = (models) => {
    OrganizationProduct.belongsTo(models.Organization, {
      foreignKey: {
        allowNull: false,
      },
    });
    OrganizationProduct.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return OrganizationProduct;
};
