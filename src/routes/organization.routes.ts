import { Router } from 'express';
import * as organizationController from '../controllers/organization.controller';
import {
  validateCreateOrganization,
  validateUpdateOrganization,
  validateOrganizationId,
  validatePagination,
} from '../validations/organization.validation';

const router = Router();

router.get('/', validatePagination, organizationController.getAll);
router.get('/:id', validateOrganizationId, organizationController.getOne);
router.post('/', validateCreateOrganization, organizationController.create);
router.patch('/:id', validateUpdateOrganization, organizationController.update);
router.delete('/:id', validateOrganizationId, organizationController.remove);

export default router;
