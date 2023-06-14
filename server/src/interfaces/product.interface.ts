import { ProductDetail } from '../types/product.type';

export interface IProduct {
  productName: string;
  productImage: string;
  imageHover?: string;
  priceNew: number;
  priceOld?: number;
  productDetail: ProductDetail;
  cateId?: string;
}
