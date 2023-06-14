import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';
const categorySchema = new Schema<ICategory>(
    {
        cateName: {
            type: String,
            required: true,
        },
        cateImage: {
            type: String,
        },
    },
    { timestamps: true }
);

export const category = model<ICategory>('categories', categorySchema);
