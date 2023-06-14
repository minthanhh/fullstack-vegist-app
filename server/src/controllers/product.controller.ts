import { UploadApiResponse } from 'cloudinary';
import { IProduct } from '../interfaces/product.interface';
import { product } from './../models/product.schema';
import { NextFunction, Request, Response } from 'express';

class ProductController {
  async getProducts(req: Request, res: Response) {
    const products = await product.find({});
    return res.json({
      success: true,
      message: 'Get list product Successfully!',
      pose: products,
    });
  }
  async getDetail(req: Request, res: Response) {
    const filter = { _id: req.params.id };
    const _product = await product.find(filter);
    return res.json({
      success: true,
      message: 'Get list product Successfully!',
      pose: _product,
    });
  }

  async create(req: Request, res: Response) {
    return res.send({
      images: req.files,
      body: req.body,
    });
  }

  async update(req: Request, res: Response) {
    const filter = { _id: req.params.id };
  }

  async delete(req: Request, res: Response) {
    try {
      const filter = { _id: req.params.id };
      const deletedProduct = await product.findByIdAndDelete(filter);
      if (deletedProduct) {
        res.status(200).json({
          success: true,
          message: 'Sản phẩm đã được xóa',
          pose: deletedProduct,
        });
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err,
      });
    }
  }
}

export default new ProductController();
