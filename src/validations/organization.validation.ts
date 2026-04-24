import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

const createOrganizationSchema = z.object({
  body: z.object({
    orgname: z.string().trim().min(1, 'orgname is required').max(255),
  }),
});

const updateOrganizationSchema = z.object({
  body: z.object({
    orgname: z.string().trim().min(1).max(255).optional(),
  }),
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),
});

type SchemaType = z.ZodObject<z.ZodRawShape>;

/**
 * Middleware factory that validates req.body, req.params, and req.query
 * against a Zod schema. Returns 400 with structured field errors on failure.
 *
 * @param schema - Zod object schema with optional body/params/query keys.
 * @returns Express middleware.
 */
function validate(schema: SchemaType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    // req.body is typed `any` by Express — safe to spread into zod for validation
     
    const result = schema.safeParse({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.flatten();
      next(new AppError(JSON.stringify(errors), 400, 'VALIDATION_ERROR'));
      return;
    }

     
    const data = result.data as { body?: Record<string, unknown>; params?: Record<string, string>; query?: Record<string, string> };
     
    if (data.body) Object.assign(req.body, data.body);
    if (data.params) Object.assign(req.params, data.params);
    if (data.query) Object.assign(req.query, data.query);

    next();
  };
}

export const validateCreateOrganization = validate(createOrganizationSchema);
export const validateUpdateOrganization = validate(updateOrganizationSchema);
export const validateOrganizationId = validate(idParamSchema);
export const validatePagination = validate(paginationSchema);
