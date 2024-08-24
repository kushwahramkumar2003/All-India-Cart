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
  pictures: z.array(z.string()).optional(),
});

type ProductData = z.infer<typeof ProductSchema>;

export async function createNewProduct(data: ProductData, files: MulterFileType[]) {
  try {
    const parsedData = ProductSchema.parse(data);

    const uploadedPictures = await Promise.all(
      files.map(async (file) => {
        const uploadedKey = await uploadFileToS3(file);
        return uploadedKey;
      })
    );

    const product = await db.product.create({
      data: {
        ...parsedData,
        pictures: uploadedPictures,
        supplierId: '6618e388c995af53f7fff68f',
      },
    });

    if (!product) {
      throw new Error('Error in creating new Product.');
    }

    return {
      message: 'Product added successfully.',
      product: product,
    };
  } catch (err) {
    console.error('Error creating product:', err);
    return { message: 'Error in creating new Product.', error: err };
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
