'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { FilePond, registerPlugin } from 'react-filepond';
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { createNewProduct } from '@/services/product';
import { useMutation } from '@tanstack/react-query';
import { VscLoading } from 'react-icons/vsc';
import CreatableSelect from 'react-select/creatable';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { toast, useToast } from '@/components/ui/use-toast';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];

const pictureSchema = z.object({
  picture: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

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
  availableSize: z.array(z.string()).optional(),
  availableColors: z.array(z.string()).optional(),
  size: z.string(),
  color: z.string(),
  discount: z.number(),
  unitWeight: z.number(),
  // unitsOnOrder: z.number(),
  reorderLevel: z.number(),
  productAvailable: z.boolean(),
  // discountAvailable: z.number(),
  picture: z.array(string()).optional(),
});

const categories = [{ label: 'mobile', value: '6618ec70c162cb5d116a2303' }] as const;

export default function NewProductForm(): React.JSX.Element {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [pictures, setPictures] = useState<string[]>([]);
  const [availableSize, setAvailableSize] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
  });

  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (data: z.infer<typeof ProductSchema>) => {
      return await createNewProduct({
        ...data,
        picture: pictures,
        availableSize: availableSize,
        availableColors: availableColors,
      });
    },
    onSuccess: (data) => {
      console.log('Product created successfully', data);
      toast({
        description: 'Product Added!',
      });
      //@ts-ignore
      form.reset({
        picture: [],
        availableColors: [],
        availableSize: [],
        name: '',
        color: '',
        categoryId: '',
        description: '',
        discount: '',
        msrp: '',
        productAvailable: '',
        size: '',
        quantityPerUnit: '',
        reorderLevel: '',
        unitInStock: '',
        unitPrice: '',
        unitWeight: '',
      });
      setAvailableColors([]);
      setAvailableSize([]);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: 'Error occure when creating new product',
      });
      console.log('error --> ', error);
    },
  });
  const submitHandler = async (data: z.infer<typeof ProductSchema>) => {
    mutate({ ...data, picture: pictures, availableSize, availableColors });
  };

  return (
    <div className="w-full space-y-10 transition-all duration-300 mt-4 mb-10 p-4">
      <div className={'flex flex-row gap-4 max-sm:flex-col  max-sm:gap-10'}>
        <div className="">
          <Card className="w-full border-none">
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className={'flex flex-col gap-6'}>
                  <div className="flex flex-col gap-6 ">
                    <div className={'flex flex-col justify-between gap-6 max-xmd:flex-col max-md:flex-col flex-wrap'}>
                      <FormField
                        control={form.control}
                        name="picture"
                        render={({ field }) => {
                          return (
                            <FormItem className=" flex-col space-y-1.5 inline">
                              <FormControl>
                                {/* @ts-ignore */}
                                <FilePond
                                  files={files}
                                  // onupdatefiles={setFiles}
                                  onupdatefiles={setFiles}
                                  allowMultiple={true}
                                  dropOnPage={true}
                                  maxFiles={3}
                                  {...field}
                                  server={{
                                    process: {
                                      url: 'http://localhost:8080/api/v1/product/upload/img',
                                      headers: {
                                        Authorization: `Bearer eyJH18ui0...`,
                                      },
                                      // ondata: (formData) => {
                                      //   formData.append('extraField', value);
                                      //   return formData;
                                      // },
                                      onload: async (res) => {
                                        const resData = await JSON.parse(res);
                                        console.log('Upload completed', resData.url);
                                        const newPictureUrl = resData.url;
                                        const newPicturesArr = [...pictures, newPictureUrl];
                                        console.log('newPictureArr ', newPicturesArr);
                                        setPictures(newPicturesArr);
                                        // console.log('current pictures ', pictures);
                                      },
                                    },
                                  }}
                                  name="files" /* sets the file input name, it's filepond by default */
                                  labelIdle='Drag & Drop your Product Images or <br/> <span class="filepond--label-action">Browse</span>'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <div></div>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={'outline-none focus:outline-none'}
                                  type="text"
                                  placeholder="Product name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            {/*<FormLabel>Language</FormLabel>*/}
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                                  >
                                    {field.value
                                      ? categories.find((category) => category.value === field.value)?.label
                                      : 'Select category'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search category..." />
                                  <CommandEmpty>No language found.</CommandEmpty>
                                  <CommandList>
                                    <CommandGroup>
                                      {categories.map((category) => (
                                        <CommandItem
                                          value={category.label}
                                          key={category.value}
                                          onSelect={() => {
                                            form.setValue('categoryId', category.value);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              category.value === field.value ? 'opacity-100' : 'opacity-0'
                                            )}
                                          />
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
                      <FormField
                        control={form.control}
                        name="quantityPerUnit"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={'outline-none focus:outline-none'}
                                  type="number"
                                  placeholder="Quantity Per Unit"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="unitPrice"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={'outline-none focus:outline-none'}
                                  type="number"
                                  placeholder="Unit Price"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="unitInStock"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} id={'unitInStock'} />
                            </FormControl>
                            <FormLabel htmlFor={'unitInStock'}>Unit in stock</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="msrp"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={'outline-none focus:outline-none'}
                                  type="number"
                                  placeholder="MSRP"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={'outline-none focus:outline-none'}
                                  type="text"
                                  placeholder="Size"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />{' '}
                      <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={'outline-none focus:outline-none'}
                                  type="text"
                                  placeholder="Color"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />{' '}
                      <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={'outline-none focus:outline-none'}
                                  type="number"
                                  placeholder="Discount"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="unitWeight"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={'outline-none focus:outline-none'}
                                  type="number"
                                  placeholder="Weight"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />{' '}
                      <FormField
                        control={form.control}
                        name="reorderLevel"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-col space-y-1.5 ">
                              <FormControl>
                                <Input
                                  className={'outline-none focus:outline-none'}
                                  type="number"
                                  placeholder="Reorder Level"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormItem className="flex flex-col space-y-1.5">
                        <FormLabel className="text-left">Sizes</FormLabel>
                        <FormControl>
                          <CreatableSelect
                            defaultValue={availableSize.map((size) => ({
                              value: size,
                              label: size,
                            }))}
                            isMulti
                            onChange={(newSize) => setAvailableSize(newSize.map((item) => item.value))}
                            className="relative z-20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem className="flex flex-col space-y-1.5">
                        <FormLabel className="text-left">Colors</FormLabel>
                        <FormControl>
                          <CreatableSelect
                            defaultValue={availableColors.map((color) => ({
                              value: color,
                              label: color,
                            }))}
                            isMulti
                            onChange={(newValue) => setAvailableColors(newValue.map((item) => item.value))}
                            className="relative z-20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormField
                        control={form.control}
                        name="productAvailable"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id={'productAvailable'}
                              />
                            </FormControl>
                            <FormLabel htmlFor={'productAvailable'}>Product Available</FormLabel>
                          </FormItem>
                        )}
                      />{' '}
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        variant={'default'}
                        className={`disabled:cursor-not-allowed disabled:bg-slate-800`}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <VscLoading className="mr-2 animate-spin spin-in-180" />
                            <span>Creating new product....</span>
                          </>
                        ) : (
                          'Save Product'
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
