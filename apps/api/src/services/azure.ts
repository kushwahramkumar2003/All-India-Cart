import multer from 'multer'
import { BlobServiceClient, StorageSharedKeyCredential, ContainerClient } from '@azure/storage-blob'
import config from '../config'
const { v4: uuidv4 } = require('uuid')

const upload = multer()

const account = config.AZURE_STORAGE_ACCOUNT_NAME || ''
const accountKey = config.AZURE_STORAGE_ACCOUNT_ACCESS_KEY || ''
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey)
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential)

async function uploadToBlobStorage(containerName: string, blobName: string, buffer: Buffer): Promise<void> {
  const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName)
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)
  await blockBlobClient.uploadData(buffer)
}

//@ts-ignore
export const azureUpload = async (file) => {
  if (!file) throw new Error('No file uploaded.')

  const buffer = file.buffer
  const fileName = `${uuidv4()}_${file.originalname}`
  const containerName = 'photosandvideos' // Replace with your container name
  const containerClient = blobServiceClient.getContainerClient(containerName)
  const blobClient = containerClient.getBlockBlobClient(fileName)

  // Upload the file to Azure Blob Storage
  await blobClient.uploadData(buffer)

  // Get the public URL of the uploaded file
  const publicUrl = blobClient.url

  console.log('File uploaded to Azure Blob Storage. Public URL:', publicUrl)

  return publicUrl
}
export const azureDelete = async (blobName: string) => {
  const containerName = config.AZURE_BLOB_CONTAINER || ''
  const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName)
  const blobClient = containerClient.getBlobClient(blobName)

  try {
    await blobClient.delete()
  } catch (error) {
    //@ts-ignore
    throw new Error(`Error deleting blob: ${error.message}`)
  }
}
