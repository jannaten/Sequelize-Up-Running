import { DataTypes, Model, Optional, Association, BelongsToGetAssociationMixin } from 'sequelize';
import { sequelize } from '../config/database';
import type { Organization } from './Organization.model';
import type { Product } from './Product.model';

export interface OrganizationProductAttributes {
  id: number;
  OrganizationId: number;
  ProductId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrganizationProductCreationAttributes = Optional<OrganizationProductAttributes, 'id'>;

export class OrganizationProduct
  extends Model<OrganizationProductAttributes, OrganizationProductCreationAttributes>
  implements OrganizationProductAttributes
{
  declare id: number;
  declare OrganizationId: number;
  declare ProductId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getOrganization: BelongsToGetAssociationMixin<Organization>;
  declare getProduct: BelongsToGetAssociationMixin<Product>;

  declare static associations: {
    organization: Association<OrganizationProduct, Organization>;
    product: Association<OrganizationProduct, Product>;
  };
}

OrganizationProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    OrganizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Organizations', key: 'id' },
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Products', key: 'id' },
    },
  },
  {
    sequelize,
    tableName: 'OrganizationProducts',
    modelName: 'OrganizationProduct',
  },
);
