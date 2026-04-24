import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'name is required').max(255),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(255).optional(),
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

const createLocalizationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'name is required').max(255),
    locale: z
      .string()
      .trim()
      .min(2, 'locale is required')
      .max(10)
      .regex(/^[a-z]{2}(-[A-Z]{2})?$/, 'locale must be a BCP 47 language tag (e.g. en, en-US)'),
    OrganizationId: z.number().int().positive(),
    ProductId: z.number().int().positive(),
  }),
});

const addLocalizedValueSchema = z.object({
  body: z.object({
    localizedValue: z.string().trim().min(1, 'localizedValue is required').max(500),
    LocalizationId: z.number().int().positive(),
  }),
});

type SchemaType = z.ZodObject<z.ZodRawShape>;

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

export const validateCreateProduct = validate(createProductSchema);
export const validateUpdateProduct = validate(updateProductSchema);
export const validateProductId = validate(idParamSchema);
export const validateCreateLocalization = validate(createLocalizationSchema);
export const validateAddLocalizedValue = validate(addLocalizedValueSchema);
