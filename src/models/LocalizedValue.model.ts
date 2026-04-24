import { DataTypes, Model, Optional, Association, BelongsToGetAssociationMixin } from 'sequelize';
import { sequelize } from '../config/database';
import type { Localization } from './Localization.model';

export interface LocalizedValueAttributes {
  id: number;
  localizedValue: string;
  LocalizationId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LocalizedValueCreationAttributes = Optional<LocalizedValueAttributes, 'id'>;

export class LocalizedValue
  extends Model<LocalizedValueAttributes, LocalizedValueCreationAttributes>
  implements LocalizedValueAttributes
{
  declare id: number;
  declare localizedValue: string;
  declare LocalizationId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getLocalization: BelongsToGetAssociationMixin<Localization>;

  declare static associations: {
    localization: Association<LocalizedValue, Localization>;
  };
}

LocalizedValue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    localizedValue: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: { notEmpty: true },
    },
    LocalizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Localizations', key: 'id' },
    },
  },
  {
    sequelize,
    tableName: 'LocalizedValues',
    modelName: 'LocalizedValue',
  },
);
