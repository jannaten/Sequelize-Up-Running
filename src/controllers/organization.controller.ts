import { Request, Response } from 'express';
import * as organizationService from '../services/organization.service';
import { catchAsync } from '../utils/catchAsync';
import { sendSuccess } from '../utils/response';

/** GET /api/organizations */
export const getAll = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const { rows, meta } = await organizationService.getAllOrganizations({ page, limit });
  sendSuccess(res, 'Organizations retrieved', rows, 200, meta);
});

/** GET /api/organizations/:id */
export const getOne = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const organization = await organizationService.getOrganizationById(Number(req.params.id));
  sendSuccess(res, 'Organization retrieved', organization);
});

/** POST /api/organizations */
export const create = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const organization = await organizationService.createOrganization(
    req.body as { orgname: string },
  );
  sendSuccess(res, 'Organization created', organization, 201);
});

/** PATCH /api/organizations/:id */
export const update = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const organization = await organizationService.updateOrganization(
    Number(req.params.id),
    req.body as { orgname?: string },
  );
  sendSuccess(res, 'Organization updated', organization);
});

/** DELETE /api/organizations/:id */
export const remove = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await organizationService.deleteOrganization(Number(req.params.id));
  sendSuccess(res, 'Organization deleted', null, 204);
});
