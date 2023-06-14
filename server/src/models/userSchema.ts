import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/userInterface';
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            require: true,
        },
        refreshToken: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

export const userModel = model<IUser>('users', userSchema);
