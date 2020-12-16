module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    Product.hasMany(models.Localize, {
      onDelete: "cascade",
    });
    Product.hasMany(models.Localization, {
      onDelte: "cascade",
    });
    Product.hasMany(models.OrganizationProduct, {
      onDelete: "cascade",
    });
  };
  return Product;
};
