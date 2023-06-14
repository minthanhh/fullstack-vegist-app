import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
cloudinary.config({
  cloud_name: 'dyfyxrbm6',
  api_key: '845178792751456',
  api_secret: 'LZnsLAk6V3bvdCXpStHkRM4bEe4',
});

const cloudinaryOption = {
  cloudinary,
  filename: function (req: Request, file: any, cb: any) {
    cb(null, file.originalname);
  },
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png'],
    resource_type: 'auto',
  },
};

const storage = new CloudinaryStorage(cloudinaryOption);

const uploadCloud = multer({ storage });

export default uploadCloud;
