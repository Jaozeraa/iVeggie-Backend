import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

interface IUploadConfig {
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, '..', 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(8).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      },
    }),
  },
} as IUploadConfig;
