import { NextFunction, Request, Response } from 'express';
import { userModel } from '../models/userSchema';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = JSON.parse(Object.keys(req.body)[0]);
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(409).json({
        success: false,
        message: 'Người dùng không tồn tại!',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không chính xác!',
      });
    }
    const accessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      'your-secret-key',
      {
        expiresIn: '10m',
      }
    );
    const refreshToken = jwt.sign({ _id: user.id }, 'your-secret-key', {
      expiresIn: '30d',
    });
    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công.',
      token: {
        accessToken,
        refreshToken,
      },
      user,
    });
  }
}

export default new LoginController();
