import { Router } from 'express';
import * as localizationController from '../controllers/localization.controller';
import {
  validateCreateLocalization,
  validateAddLocalizedValue,
  validateProductId,
} from '../validations/product.validation';
import { validatePagination } from '../validations/organization.validation';

const router = Router();

router.get('/', validatePagination, localizationController.getAll);
router.get('/:id', validateProductId, localizationController.getOne);
router.post('/', validateCreateLocalization, localizationController.create);
router.post('/values', validateAddLocalizedValue, localizationController.addValue);
router.delete('/:id', validateProductId, localizationController.remove);

export default router;
