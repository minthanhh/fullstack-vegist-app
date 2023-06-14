import { Router } from 'express';
import productController from '../controllers/categories.controller';
const router = Router();

router.get('/', productController.getCategories);

export default router;
