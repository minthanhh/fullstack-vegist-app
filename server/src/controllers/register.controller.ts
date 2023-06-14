import { NextFunction, Request, Response } from 'express';
import { userModel } from '../models/userSchema';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class RegisterController {
    async register(req: Request, res: Response, next: NextFunction) {
        const { username, email, password } = JSON.parse(
            Object.keys(req.body)[0]
        );
        const userExist = await userModel.findOne({ email: email });
        if (userExist) {
            return res.status(409).json({
                success: false,
                message: 'Người dụng đã tồn tại!',
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });
        const refreshToken = jwt.sign({ email }, 'your-secret-key', {
            expiresIn: '30d',
        });
        const accessToken = jwt.sign(
            { _id: createdUser._id, email },
            'your-secret-key',
            {
                expiresIn: '10m',
            }
        );
        await userModel.findOneAndUpdate(
            {
                _id: createdUser._id,
            },
            { refreshToken }
        );
        return res.status(201).json({
            success: true,
            message: 'Tạo tài khoản thành công.',
            token: { accessToken, refreshToken },
        });
    }
}

export default new RegisterController();
