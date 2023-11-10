import { BadRequestException } from '@nestjs/common';

/* Image file filter purpose only */

export const ImageFileFilter = (_, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException('Only JPG, JPEG, PNG, or GIF file are allowed!'),
      false,
    );
  }
  callback(null, true);
};
