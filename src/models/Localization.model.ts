import {
  DataTypes,
  Model,
  Optional,
  Association,
  BelongsToGetAssociationMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import { sequelize } from '../config/database';
import type { Organization } from './Organization.model';
import type { Product } from './Product.model';
import type { LocalizedValue } from './LocalizedValue.model';

export interface LocalizationAttributes {
  id: number;
  name: string;
  locale: string;
  OrganizationId: number;
  ProductId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LocalizationCreationAttributes = Optional<LocalizationAttributes, 'id'>;

export class Localization
  extends Model<LocalizationAttributes, LocalizationCreationAttributes>
  implements LocalizationAttributes
{
  declare id: number;
  declare name: string;
  declare locale: string;
  declare OrganizationId: number;
  declare ProductId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getOrganization: BelongsToGetAssociationMixin<Organization>;
  declare getProduct: BelongsToGetAssociationMixin<Product>;
  declare createLocalizedValue: HasManyCreateAssociationMixin<LocalizedValue>;

  declare static associations: {
    organization: Association<Localization, Organization>;
    product: Association<Localization, Product>;
    localizedValues: Association<Localization, LocalizedValue>;
  };
}

Localization.init(
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
    locale: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: { notEmpty: true },
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
    tableName: 'Localizations',
    modelName: 'Localization',
  },
);
