import { Readable } from 'stream';

import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import multer from 'multer';

import { s3Client } from '@/lib/aws-config';

const multerUpload = multer({
  storage: multer.memoryStorage(),
});

export type MulterFileType = {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

const uploadFileToS3 = async (file: MulterFileType) => {
  if (!file) {
    return null;
  }
  const fileStream = Readable.from(file.buffer);
  const uniqueFileName = `${Date.now()}-${file.originalname}`;
  const s3Params = {
    Bucket: process.env.S3_BUCKET || '',
    Key: uniqueFileName,
    Body: fileStream,
    ContentType: file.mimetype,
  };
  const s3Upload = new Upload({
    client: s3Client,
    params: s3Params,
  });
  const uploadResult = await s3Upload.done();
  // console.log('Upload Result:', uploadResult);
  return uploadResult;
};

const deleteFileFromS3 = async (fileKey: string) => {
  if (!fileKey) {
    return null;
  }
  const deleteParams = {
    Bucket: process.env.S3_BUCKET || '',
    Key: fileKey,
  };
  await s3Client.send(new DeleteObjectCommand(deleteParams));
  return true;
};

export { multerUpload, uploadFileToS3, deleteFileFromS3 };
