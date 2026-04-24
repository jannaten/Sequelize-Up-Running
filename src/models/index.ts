import { sequelize, connectDatabase } from '../config/database';
import { Organization } from './Organization.model';
import { Product } from './Product.model';
import { OrganizationProduct } from './OrganizationProduct.model';
import { Localization } from './Localization.model';
import { LocalizedValue } from './LocalizedValue.model';

// ─── Associations ─────────────────────────────────────────────────────────────

Organization.hasMany(OrganizationProduct, { foreignKey: 'OrganizationId', onDelete: 'CASCADE' });
OrganizationProduct.belongsTo(Organization, { foreignKey: 'OrganizationId' });

Product.hasMany(OrganizationProduct, { foreignKey: 'ProductId', onDelete: 'CASCADE' });
OrganizationProduct.belongsTo(Product, { foreignKey: 'ProductId' });

Organization.belongsToMany(Product, {
  through: OrganizationProduct,
  foreignKey: 'OrganizationId',
  otherKey: 'ProductId',
});
Product.belongsToMany(Organization, {
  through: OrganizationProduct,
  foreignKey: 'ProductId',
  otherKey: 'OrganizationId',
});

Organization.hasMany(Localization, { foreignKey: 'OrganizationId', onDelete: 'CASCADE' });
Localization.belongsTo(Organization, { foreignKey: 'OrganizationId' });

Product.hasMany(Localization, { foreignKey: 'ProductId', onDelete: 'CASCADE' });
Localization.belongsTo(Product, { foreignKey: 'ProductId' });

Localization.hasMany(LocalizedValue, { foreignKey: 'LocalizationId', onDelete: 'CASCADE' });
LocalizedValue.belongsTo(Localization, { foreignKey: 'LocalizationId' });

export {
  sequelize,
  connectDatabase,
  Organization,
  Product,
  OrganizationProduct,
  Localization,
  LocalizedValue,
};
