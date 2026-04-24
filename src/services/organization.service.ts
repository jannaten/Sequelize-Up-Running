import { Organization } from '../models/Organization.model';
import { AppError } from '../utils/AppError';
import type {
  OrganizationCreationInput,
  PaginationQuery,
  PaginationMeta,
} from '../types/models.types';

export interface PaginatedOrganizations {
  rows: Organization[];
  meta: PaginationMeta;
}

/**
 * Retrieve a paginated list of all organizations.
 *
 * @param pagination - Page index and page size.
 * @returns Organizations array and pagination metadata.
 */
export async function getAllOrganizations(
  pagination: PaginationQuery,
): Promise<PaginatedOrganizations> {
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;

  const { count, rows } = await Organization.findAndCountAll({ limit, offset, order: [['id', 'ASC']] });

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
 * Retrieve a single organization by primary key.
 *
 * @param id - Organization primary key.
 * @returns The Organization instance.
 * @throws AppError(404) when no organization is found with that id.
 */
export async function getOrganizationById(id: number): Promise<Organization> {
  const organization = await Organization.findByPk(id);
  if (!organization) {
    throw new AppError(`Organization with id ${id} not found`, 404, 'NOT_FOUND');
  }
  return organization;
}

/**
 * Create a new organization.
 *
 * @param input - Validated organization creation fields.
 * @returns The newly created Organization instance.
 */
export async function createOrganization(input: OrganizationCreationInput): Promise<Organization> {
  return Organization.create(input);
}

/**
 * Update an existing organization's fields.
 *
 * @param id - Organization primary key.
 * @param input - Partial fields to update.
 * @returns The updated Organization instance.
 * @throws AppError(404) when no organization is found with that id.
 */
export async function updateOrganization(
  id: number,
  input: Partial<OrganizationCreationInput>,
): Promise<Organization> {
  const organization = await getOrganizationById(id);
  await organization.update(input);
  return organization;
}

/**
 * Delete an organization by primary key.
 *
 * @param id - Organization primary key.
 * @throws AppError(404) when no organization is found with that id.
 */
export async function deleteOrganization(id: number): Promise<void> {
  const organization = await getOrganizationById(id);
  await organization.destroy();
}
