type ProductInfo = {
  vendor?: string;
  type?: string;
  size?: string[];
  barcode?: number;
  weight?: string;
};

type ProductDescMain = {
  moreDetail: string[];
  speccification: string[];
};

export type ProductDetail = {
  availability: string;
  productImages: string[];
  productDesc: string;
  productDescMain: ProductDescMain;
  productInfo: ProductInfo;
};
