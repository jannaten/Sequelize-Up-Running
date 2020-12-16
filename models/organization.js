module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define("Organization", {
    orgname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Organization.associate = (models) => {
    Organization.hasMany(models.OrganizationProduct, {
      onDelete: "cascade",
    });
    Organization.hasMany(models.Localization, {
      onDelte: "cascade",
    });
  };

  return Organization;
};
