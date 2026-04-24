import { DataTypes, Model, Optional, Association, HasManyCreateAssociationMixin } from 'sequelize';
import { sequelize } from '../config/database';
import type { OrganizationProduct } from './OrganizationProduct.model';
import type { Localization } from './Localization.model';

export interface OrganizationAttributes {
  id: number;
  orgname: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrganizationCreationAttributes = Optional<OrganizationAttributes, 'id'>;

export class Organization
  extends Model<OrganizationAttributes, OrganizationCreationAttributes>
  implements OrganizationAttributes
{
  declare id: number;
  declare orgname: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare createOrganizationProduct: HasManyCreateAssociationMixin<OrganizationProduct>;
  declare createLocalization: HasManyCreateAssociationMixin<Localization>;

  declare static associations: {
    organizationProducts: Association<Organization, OrganizationProduct>;
    localizations: Association<Organization, Localization>;
  };
}

Organization.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orgname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: true },
    },
  },
  {
    sequelize,
    tableName: 'Organizations',
    modelName: 'Organization',
  },
);
