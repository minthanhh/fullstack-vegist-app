import { Request, Response } from 'express';
import { category } from '../models/category.schema';

class CategoryController {
  async getCategories(req: Request, res: Response) {
    const categories = await category.find({});
    return res.json({
      success: true,
      message: 'Get list product Successfully!',
      pose: categories,
    });
  }
}

export default new CategoryController();
