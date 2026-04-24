import { Router } from 'express';
import organizationRoutes from './organization.routes';
import productRoutes from './product.routes';
import localizationRoutes from './localization.routes';

const router = Router();

router.use('/organizations', organizationRoutes);
router.use('/products', productRoutes);
router.use('/localizations', localizationRoutes);

export default router;
