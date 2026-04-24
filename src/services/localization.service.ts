import { Localization } from '../models/Localization.model';
import { LocalizedValue } from '../models/LocalizedValue.model';
import { Organization } from '../models/Organization.model';
import { Product } from '../models/Product.model';
import { AppError } from '../utils/AppError';
import type {
  LocalizationCreationInput,
  LocalizedValueCreationInput,
  PaginationQuery,
  PaginationMeta,
} from '../types/models.types';

export interface PaginatedLocalizations {
  rows: Localization[];
  meta: PaginationMeta;
}

/**
 * Retrieve a paginated list of all localizations, including their parent associations.
 *
 * @param pagination - Page index and page size.
 * @returns Localizations array and pagination metadata.
 */
export async function getAllLocalizations(
  pagination: PaginationQuery,
): Promise<PaginatedLocalizations> {
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;

  const { count, rows } = await Localization.findAndCountAll({
    limit,
    offset,
    order: [['id', 'ASC']],
    include: [
      { model: Organization, attributes: ['id', 'orgname'] },
      { model: Product, attributes: ['id', 'name'] },
    ],
  });

  return {
    rows,
    meta: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
}

/**
 * Retrieve a single localization by primary key, including its localized values.
 *
 * @param id - Localization primary key.
 * @returns The Localization instance with nested LocalizedValues.
 * @throws AppError(404) when not found.
 */
export async function getLocalizationById(id: number): Promise<Localization> {
  const localization = await Localization.findByPk(id, {
    include: [
      { model: Organization, attributes: ['id', 'orgname'] },
      { model: Product, attributes: ['id', 'name'] },
      { model: LocalizedValue },
    ],
  });
  if (!localization) {
    throw new AppError(`Localization with id ${id} not found`, 404, 'NOT_FOUND');
  }
  return localization;
}

/**
 * Create a new localization entry.
 *
 * @param input - Validated localization creation fields.
 * @returns The newly created Localization instance.
 */
export async function createLocalization(input: LocalizationCreationInput): Promise<Localization> {
  return Localization.create(input);
}

/**
 * Add a localized value string to an existing localization.
 *
 * @param input - Localized value and its parent LocalizationId.
 * @returns The newly created LocalizedValue instance.
 * @throws AppError(404) when the parent localization does not exist.
 */
export async function addLocalizedValue(
  input: LocalizedValueCreationInput,
): Promise<LocalizedValue> {
  const parent = await Localization.findByPk(input.LocalizationId);
  if (!parent) {
    throw new AppError(
      `Localization with id ${input.LocalizationId} not found`,
      404,
      'NOT_FOUND',
    );
  }
  return LocalizedValue.create(input);
}

/**
 * Delete a localization by primary key.
 *
 * @param id - Localization primary key.
 * @throws AppError(404) when not found.
 */
export async function deleteLocalization(id: number): Promise<void> {
  const localization = await getLocalizationById(id);
  await localization.destroy();
}
