import { DataTypes, Model, Optional, Association, HasManyCreateAssociationMixin } from 'sequelize';
import { sequelize } from '../config/database';
import type { OrganizationProduct } from './OrganizationProduct.model';
import type { Localization } from './Localization.model';

export interface ProductAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  declare id: number;
  declare name: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare createOrganizationProduct: HasManyCreateAssociationMixin<OrganizationProduct>;
  declare createLocalization: HasManyCreateAssociationMixin<Localization>;

  declare static associations: {
    organizationProducts: Association<Product, OrganizationProduct>;
    localizations: Association<Product, Localization>;
  };
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  {
    sequelize,
    tableName: 'Products',
    modelName: 'Product',
  },
);
