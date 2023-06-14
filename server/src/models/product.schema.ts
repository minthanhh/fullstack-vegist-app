import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';
const productSchema = new Schema<IProduct>(
    {
        productName: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
            required: true,
        },
        imageHover: {
            type: String,
            required: true,
        },
        priceNew: {
            type: Number,
            required: true,
        },
        priceOld: {
            type: Number,
            required: true,
        },
        productDetail: {
            type: Object,
            required: true,
        },
        cateId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const product = model<IProduct>('products', productSchema);
