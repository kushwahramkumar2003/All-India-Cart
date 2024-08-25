'use server';

import { db } from '@/db';
import { MulterFileType, uploadFileToS3 } from '@/services/s3';
import { Product } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@/lib/auth';

interface SAPResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data: T | null;
}

const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  categoryId: z.string(),
  quantityPerUnit: z.number(),
  unitPrice: z.number(),
  unitInStock: z.boolean(),
  msrp: z.number(),
  availableSize: z.array(z.string()),
  availableColors: z.array(z.string()),
  size: z.string(),
  color: z.string(),
  discount: z.number(),
  unitWeight: z.number(),
  reorderLevel: z.number(),
  productAvailable: z.boolean(),
  picture: z.array(z.string()).optional(),
});

interface CreateProductPayload {
  name: string;
  description: string;
  categoryId: string;
  quantityPerUnit: number;
  unitPrice: number;
  unitInStock: boolean;
  msrp: number;
  size: string;
  color: string;
  discount: number;
  unitWeight: number;
  reorderLevel: number;
  productAvailable: boolean;
  availableSize: string[];
  availableColors: string[];
  picture: string[];
}

type ProductData = z.infer<typeof ProductSchema>;

export async function createNewProduct(formData: FormData) {
  try {
    const data = ProductSchema.parse({
      name: formData.get('name'),
      description: formData.get('description'),
      categoryId: formData.get('categoryId'),
      quantityPerUnit: Number(formData.get('quantityPerUnit')),
      unitPrice: Number(formData.get('unitPrice')),
      unitInStock: formData.get('unitInStock') === 'true',
      msrp: Number(formData.get('msrp')),
      availableSize: formData.getAll('availableSize[]'),
      availableColors: formData.getAll('availableColors[]'),
      size: formData.get('size'),
      color: formData.get('color'),
      discount: Number(formData.get('discount')),
      unitWeight: Number(formData.get('unitWeight')),
      reorderLevel: Number(formData.get('reorderLevel')),
      productAvailable: formData.get('productAvailable') === 'true',
      picture: formData.getAll('pictures[]'),
    });
    debugger;
    const product = await db.product.create({
      data: {
        ...data,
        supplierId: '6618e388c995af53f7fff68f',
      },
    });

    if (!product) {
      throw new Error('Error in creating new Product.');
    }
    debugger;
    return {
      message: 'Product added successfully.',
      product: product,
    };
  } catch (err) {
    console.error('Error creating product:', err);
    return { message: 'Error in creating new Product.', error: err };
  }
}

export async function uploadFiles(formData: FormData) {
  try {
    console.log('here 2');
    const logoFile = formData.get('logo') as File;
    const imageFiles = formData.getAll('images[]') as File[];

    // console.log('logoFile', logoFile);
    // console.log('imageFiles', imageFiles);

    const allFiles = [logoFile, ...imageFiles];

    // Map over all files and upload them to S3
    const uploadedUrls = await Promise.all(
      allFiles.map(async (file) => {
        const multerFile = {
          originalname: file.name,
          mimetype: file.type,
          buffer: Buffer.from(await file.arrayBuffer()), // Convert File to Buffer
          size: file.size,
        };
        const uploadedRes = await uploadFileToS3(multerFile);
        // console.log('uploadedRes', uploadedRes);
        return `https://s3.ap-south-1.amazonaws.com/ramkumar.all-india-cart.bucket/${uploadedRes?.Key}`;
      })
    );
    // debugger;
    return uploadedUrls;
  } catch (err) {
    console.error('Error uploading files:', err);
    throw new Error('File upload failed.');
  }
}

export async function getAllSupplierProducts({
  searchQuery,
}: {
  searchQuery: string;
}): Promise<SAPResponse<Product[]>> {
  try {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
      return {
        status: 'error',
        message: 'Unauthorized. Please log in.',
        data: null,
      };
    }

    console.log('session', session.user.id);

    // Fetch products based on the search query and the logged-in supplier's ID
    const products = await db.product.findMany({
      where: {
        //@ts-ignore
        supplierId: session.user?.id,
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        category: true,
      },
    });

    return {
      status: 'success',
      message: 'Products retrieved successfully.',
      data: products,
    };
  } catch (error) {
    console.error('Error fetching products:', error);

    return {
      status: 'error',
      message: 'An error occurred while fetching products.',
      data: null,
    };
  }
}

export async function deleteProduct({ id }: { id: string }): Promise<SAPResponse<null>> {
  try {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
      return {
        status: 'error',
        message: 'Unauthorized. Please log in.',
        data: null,
      };
    }

    console.log('session', session.user.id);

    const res = await db.product.delete({
      where: {
        id,
      },
    });
    if (res)
      return {
        status: 'success',
        message: 'Products deleted',
        data: null,
      };
    return {
      status: 'error',
      message: 'An error occurred while deleting products.',
      data: null,
    };
  } catch (error) {
    console.error('An error occurred while deleting products : ', error);
    return {
      status: 'error',
      message: 'An error occurred while deleting products.',
      data: null,
    };
  }
}
