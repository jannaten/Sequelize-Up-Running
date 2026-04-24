import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateProductId,
} from '../validations/product.validation';
import { validatePagination } from '../validations/organization.validation';

const router = Router();

router.get('/', validatePagination, productController.getAll);
router.get('/:id', validateProductId, productController.getOne);
router.post('/', validateCreateProduct, productController.create);
router.patch('/:id', validateUpdateProduct, productController.update);
router.delete('/:id', validateProductId, productController.remove);

export default router;
