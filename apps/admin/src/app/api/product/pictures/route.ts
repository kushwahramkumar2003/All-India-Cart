import { randomUUID } from 'crypto';
import { Readable } from 'stream';

import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { azureUpload } from '@/services/azure';

export async function POST(req: NextRequest) {
  try {
    console.log('Request arrived for picture upload.');

    // Authentication Middleware
    const response = await authMiddleware(req);
    if (response.status !== 200) return response;

    // Parse FormData
    const formData = await req.formData();
    console.log('FormData:', formData);

    // Extract File
    const file = formData.get('files');
    console.log('File:', file);

    // Validate File Presence
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert File to Stream
    //@ts-ignore
    const fileStream = Readable.from(await file.arrayBuffer());

    // Upload File to Azure
    const fileName = `${randomUUID()}_${file.name}`;
    const url = await azureUpload(fileStream, fileName);

    // Return Success Response
    return NextResponse.json(
      {
        message: 'Product image uploaded successfully',
        url,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error during file upload:', err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
