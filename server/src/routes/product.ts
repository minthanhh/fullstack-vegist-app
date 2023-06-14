import { Router } from 'express';
import productController from '../controllers/product.controller';
import uploadCloud from '../configs/cloudinary.config';
const router = Router();

router.get('/', productController.getProducts);
router.get('/product-detail/:id', productController.getDetail);
router.put('/product-update/:id', productController.update);

router.post(
  '/product-create',
  uploadCloud.fields([
    {
      name: 'file',
      maxCount: 4,
    },
  ]),
  productController.create
);

router.delete('/product-delete/:id', productController.delete);

export default router;
