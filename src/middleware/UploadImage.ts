import { HttpException, HttpStatus } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/) || !file) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }

  callback(null, true);
};

export const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: 'semsar',

    public_id: (req, file) =>
      `${Date.now() * Math.random()}-${file.originalname.substring(
        0,
        file.originalname.length - 4,
      )}`,
  },
});
