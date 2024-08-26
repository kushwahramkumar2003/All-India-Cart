import { randomUUID } from 'crypto';

import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';

import constants from '@/constants';

const account = constants.AZURE_STORAGE_ACCOUNT_NAME || '';
const accountKey = constants.AZURE_STORAGE_ACCOUNT_ACCESS_KEY || '';
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential);

//@ts-ignore
export const azureUpload = async (fileStream: Readable, fileName: string) => {
  if (!fileStream) throw new Error('No file stream provided.');

  const containerName = constants.AZURE_BLOB_CONTAINER || '';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(fileName);

  // Upload the file stream to Azure Blob Storage
  await blobClient.uploadStream(fileStream);

  // Get the public URL of the uploaded file
  const publicUrl = blobClient.url;

  console.log('File uploaded to Azure Blob Storage. Public URL:', publicUrl);

  return publicUrl;
};

async function uploadToBlobStorage(containerName: string, blobName: string, buffer: Buffer): Promise<void> {
  const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(buffer);
}
export const azureDelete = async (blobName: string) => {
  const containerName = constants.AZURE_BLOB_CONTAINER || '';
  const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  try {
    await blobClient.delete();
  } catch (error) {
    //@ts-ignore
    throw new Error(`Error deleting blob: ${error.message}`);
  }
};

export const imageArrUploader = async (files: File[]) => {
  try {
    const uploadPromises = files.map(async (file, index) => {
      // Upload each file to Azure Blob Storage

      //@ts-ignore
      const publicUrl = await azureUpload(file);
      return { index, publicUrl };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    // Now you have an array of objects containing index and publicUrl of each uploaded file
    // You can use this array as needed, for example, to store the URLs in your database
    console.log(uploadedFiles);

    return uploadedFiles.map((item) => item.publicUrl);
  } catch (error) {
    console.error('Error uploading images to Azure Blob Storage:', error);
    throw error;
  }
};
