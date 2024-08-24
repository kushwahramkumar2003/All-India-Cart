'use client';

import React, { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronsUpDown } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { z } from 'zod';

import { ProductSchema } from '@/types/product';
import { cn } from '@/lib/utils';
import { createNewProduct } from '@/actions/prodoctActions';
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

export default function NewProductForm(): React.JSX.Element {
  const { toast } = useToast();
  const [files, setFiles] = React.useState<File[]>([]);
  const [availableSize, setAvailableSize] = React.useState<string[]>([]);
  const [availableColors, setAvailableColors] = React.useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_IMAGE_MIME_TYPES.join(','),
  });

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
  });

  const submitHandler = async (data: z.infer<typeof ProductSchema>) => {
    // Convert string values to numbers
    const convertedData = {
      ...data,
      quantityPerUnit: Number(data.quantityPerUnit),
      unitPrice: Number(data.unitPrice),
      unitWeight: Number(data.unitWeight),
      discount: Number(data.discount),
      msrp: Number(data.msrp),
      reorderLevel: Number(data.reorderLevel),
    };

    try {
      await createNewProduct({ ...convertedData, availableSize, availableColors }, files);
      toast({
        description: 'Product Added!',
      });
      form.reset({
        pictures: [],
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
      setFiles([]);
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Error occurred when creating new product',
      });
      console.log('error --> ', error);
    }
  };

  return (
    <div className="w-full space-y-10 transition-all duration-300 mt-4 mb-10 p-4">
      <div className={'flex flex-row gap-4 max-sm:flex-col max-sm:gap-10'}>
        <Card className="w-full border-none">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitHandler)} className={'flex flex-col gap-6'}>
                <div className="flex flex-col gap-6">
                  <div className={'flex flex-col justify-between gap-6 max-xmd:flex-col max-md:flex-col flex-wrap'}>
                    <div {...getRootProps({ className: 'dropzone' })} className="border-dashed border-2 p-4">
                      <input {...getInputProps()} />
                      <p>Drag & drop some files here, or click to select files</p>
                      <div className="flex flex-wrap mt-2">
                        {files.map((file) => (
                          <div key={file.name} className="mr-2">
                            {file.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1.5">
                          <FormControl>
                            <Input type="text" placeholder="Product name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
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
                                <CommandList>
                                  <CommandEmpty>No category found.</CommandEmpty>
                                  <CommandGroup>
                                    {categories.map((category) => (
                                      <CommandItem
                                        value={category.value}
                                        key={category.value}
                                        onSelect={(value) => {
                                          form.setValue('categoryId', value);
                                        }}
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
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1.5">
                          <FormControl>
                            <Textarea placeholder="Description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center justify-between space-x-6">
                      <FormField
                        control={form.control}
                        name="unitPrice"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Input type="number" placeholder="Unit price" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="quantityPerUnit"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Input type="number" placeholder="Quantity per unit" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="unitWeight"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Input type="number" placeholder="Unit weight" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Input type="number" placeholder="Discount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="msrp"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Input type="number" placeholder="MSRP" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="reorderLevel"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Input type="number" placeholder="Reorder level" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                      <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Input type="text" placeholder="Size" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Input type="text" placeholder="Color" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="unitInStock"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(checked)}
                                className="h-5 w-5 text-red-500"
                              />
                            </FormControl>
                            <FormLabel>Unit in stock</FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="productAvailable"
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-1.5">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(checked)}
                                className="h-5 w-5 text-red-500"
                              />
                            </FormControl>
                            <FormLabel>Product available</FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <CreatableSelect
                        instanceId="availableSize"
                        isMulti
                        options={[]}
                        value={availableSize.map((size) => ({ label: size, value: size }))}
                        onChange={(selectedOptions) => setAvailableSize(selectedOptions.map((option) => option.value))}
                      />
                      <FormDescription>Add Available Sizes</FormDescription>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <CreatableSelect
                        instanceId="availableColors"
                        isMulti
                        options={[]}
                        value={availableColors.map((color) => ({ label: color, value: color }))}
                        onChange={(selectedOptions) =>
                          setAvailableColors(selectedOptions.map((option) => option.value))
                        }
                      />
                      <FormDescription>Add Available Colors</FormDescription>
                    </div>
                  </div>
                </div>
                <div className="w-1/3 mx-auto">
                  <Button className="w-full" type="submit">
                    Create
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
