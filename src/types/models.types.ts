/** Shared type for paginated list responses. */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** Standard API response envelope. */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

/** Organization creation attributes (subset accepted from the caller). */
export interface OrganizationCreationInput {
  orgname: string;
}

/** Product creation attributes. */
export interface ProductCreationInput {
  name: string;
}

/** Localization creation attributes. */
export interface LocalizationCreationInput {
  name: string;
  locale: string;
  OrganizationId: number;
  ProductId: number;
}

/** LocalizedValue creation attributes. */
export interface LocalizedValueCreationInput {
  localizedValue: string;
  LocalizationId: number;
}

/** Pagination query parameters, already coerced to numbers. */
export interface PaginationQuery {
  page: number;
  limit: number;
}
