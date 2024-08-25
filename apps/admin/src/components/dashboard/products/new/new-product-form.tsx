'use client';

import React, { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { MdOutlineCancel } from 'react-icons/md';
import CreatableSelect from 'react-select/creatable';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { createNewProduct, uploadFiles } from '@/actions/prodoctActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { toast, useToast } from '@/components/ui/use-toast';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const categories = [{ label: 'mobile', value: '6618ec70c162cb5d116a2303' }] as const;

export const ProductSchema = z.object({
  // sku: z.string(),
  name: z.string(),
  description: z.string(),
  // supplierId: z.string(),
  categoryId: z.string(),
  quantityPerUnit: z.number().min(0),
  unitPrice: z.number(),
  unitInStock: z.boolean(),
  msrp: z.number(),
  // availableSize: z.array(z.string()).optional(),
  // availableColors: z.array(z.string()).optional(),
  size: z.string(),
  color: z.string(),
  discount: z.number(),
  unitWeight: z.number(),
  // unitsOnOrder: z.number(),
  reorderLevel: z.number(),
  productAvailable: z.boolean(),
  // discountAvailable: z.number(),
  // picture: z.array(string()).optional(),
});

export default function NewProductForm(): React.JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const { toast } = useToast();
  const [files, setFiles] = React.useState<File[]>([]);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [availableSize, setAvailableSize] = React.useState<string[]>([]);
  const [availableColors, setAvailableColors] = React.useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const onLogoDrop = useCallback((acceptedFiles: File[]) => {
    setLogoFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'image/webp': ['.webp'],
    },
  });

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: onLogoDrop,
    maxSize: MAX_FILE_SIZE,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'image/webp': ['.webp'],
    },
    multiple: false,
  });

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      unitPrice: 0,
      quantityPerUnit: 0,
      unitWeight: 0,
      discount: 0,
      msrp: 0,
      reorderLevel: 0,
      color: 'Black',
      size: 'L',
    },
  });

  const submitHandler = async (data: z.infer<typeof ProductSchema>) => {
    const convertedData = {
      ...data,
      quantityPerUnit: Number(data.quantityPerUnit),
      unitPrice: Number(data.unitPrice),
      unitWeight: Number(data.unitWeight),
      discount: Number(data.discount),
      msrp: Number(data.msrp),
      reorderLevel: Number(data.reorderLevel),
    };

    const formData = new FormData();
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    files.forEach((file) => {
      formData.append('images[]', file);
    });

    try {
      setIsImageUploading(true);
      const uploadedUrls = await uploadFiles(formData);
      setIsImageUploading(false);
      setLoading(true);
      const newData = {
        ...convertedData,
        availableSize,
        availableColors,
        pictures: uploadedUrls as string[],
      };

      const formData2 = new FormData();

      // Dynamically append all fields from newData to formData2
      Object.entries(newData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData2.append(`${key}[]`, item));
        } else {
          formData2.append(key, value.toString());
        }
      });

      const res = await createNewProduct(formData2);
      toast({ description: 'Product Added!' });

      // Reset form state
      form.reset();
      setAvailableColors([]);
      setAvailableSize([]);
      setFiles([]);
      setLogoFile(null);
      setLoading(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Error occurred when creating new product',
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
              {/* Logo/Hero Image Upload */}
              <div className="flex flex-col space-y-4">
                <FormLabel>Product Logo/Hero Image</FormLabel>
                <div {...getLogoRootProps()} className="border-dashed border-2 p-4 rounded-md cursor-pointer">
                  <input {...getLogoInputProps()} />
                  <p className="text-center">Drag & drop the logo/hero image here, or click to select a file</p>
                </div>
                {logoFile && (
                  <div className="mt-4 relative flex justify-center">
                    <button
                      type="button"
                      onClick={() => setLogoFile(null)}
                      className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition"
                    >
                      <MdOutlineCancel size={24} />
                    </button>
                    <img src={URL.createObjectURL(logoFile)} alt="Product Logo/Hero" className="max-h-48 rounded-lg" />
                  </div>
                )}
              </div>

              {/* Product Images Upload */}
              <div className="flex flex-col space-y-4">
                <FormLabel>Product Images</FormLabel>
                <div {...getRootProps()} className="border-dashed border-2 p-4 rounded-md cursor-pointer">
                  <input {...getInputProps()} />
                  <p className="text-center">Drag & drop some files here, or click to select files</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
                        }}
                        className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition"
                      >
                        <MdOutlineCancel size={24} />
                      </button>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter product description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" role="combobox" className={cn('w-full justify-between')}>
                            {field.value
                              ? categories.find((category) => category.value === field.value)?.label
                              : 'Select category'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => (
                                <CommandItem
                                  key={category.value}
                                  onSelect={() => form.setValue('categoryId', category.value)}
                                >
                                  {category.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pricing and Stock Details */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="unitPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter unit price"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantityPerUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity Per Unit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter quantity per unit"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unitWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter unit weight"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter discount percentage"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="msrp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MSRP</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter MSRP"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reorderLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reorder Level</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter reorder level"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Available Sizes */}
              <div>
                <FormLabel>Available Sizes</FormLabel>
                <CreatableSelect
                  isMulti
                  onChange={(selected) => setAvailableSize(selected.map((opt) => opt.value))}
                  options={availableSize.map((size) => ({ label: size, value: size }))}
                />
              </div>

              {/* Available Colors */}
              <div>
                <FormLabel>Available Colors</FormLabel>
                <CreatableSelect
                  isMulti
                  onChange={(selected) => setAvailableColors(selected.map((opt) => opt.value))}
                  options={availableColors.map((color) => ({ label: color, value: color }))}
                />
              </div>

              {/* Product Availability */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="productAvailable"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel>Product Available</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unitInStock"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      <FormLabel>Unit In Stock</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                onSubmit={form.handleSubmit(submitHandler)}
                disabled={isLoading || isImageUploading}
              >
                {isImageUploading && 'Image Uploading...'}
                {isLoading && 'Still creating product...'}
                {!isImageUploading && !isLoading && 'Add Product'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
