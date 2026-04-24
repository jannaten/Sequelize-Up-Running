import { Request, Response } from 'express';
import * as localizationService from '../services/localization.service';
import { catchAsync } from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';

/** GET /api/localizations */
export const getAll = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const { rows, meta } = await localizationService.getAllLocalizations({ page, limit });
  sendSuccess(res, 'Localizations retrieved', rows, 200, meta);
});

/** GET /api/localizations/:id */
export const getOne = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const localization = await localizationService.getLocalizationById(Number(req.params.id));
  sendSuccess(res, 'Localization retrieved', localization);
});

/** POST /api/localizations */
export const create = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const localization = await localizationService.createLocalization(
    req.body as { name: string; locale: string; OrganizationId: number; ProductId: number },
  );
  sendSuccess(res, 'Localization created', localization, 201);
});

/** POST /api/localizations/values */
export const addValue = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const value = await localizationService.addLocalizedValue(
    req.body as { localizedValue: string; LocalizationId: number },
  );
  sendSuccess(res, 'Localized value added', value, 201);
});

/** DELETE /api/localizations/:id */
export const remove = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await localizationService.deleteLocalization(Number(req.params.id));
  sendSuccess(res, 'Localization deleted', null, 204);
});
