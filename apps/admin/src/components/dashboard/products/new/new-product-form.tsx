'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast, useToast } from '@/components/ui/use-toast';

const ProductSchema = z.object({
  // sku: z.string(),
  name: z.string(),
  description: z.string(),
  supplierId: z.string(),
  categoryId: z.string(),
  quantityPerUnit: z.number().min(0),
  unitPrice: z.number(),
  unitInStock: z.boolean(),
  msrp: z.number(),
  availableSize: z.array(z.string()),
  availableColors: z.array(z.string()),
  size: z.string(),
  color: z.string(),
  discount: z.number(),
  unitWeight: z.number(),
  unitsOnOrder: z.number(),
  reorderLevel: z.number(),
  productAvailable: z.boolean(),
  discountAvailable: z.number(),
  picture: z.array(z.string()).optional(),
});

const categories = [
  { label: 'Phone', value: 'laksndvoiaenroi' },
  { label: 'Laptop', value: 'fralaknsdvlknasldf' },
  { label: 'TWS', value: 'dsdfsadfe' },
  { label: 'Gifts', value: 'esasdfasf' },
] as const;

export default function NewProductForm(): React.JSX.Element {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
  });

  // const { isPending, mutate } = useMutation({
  //   mutationFn: async (data: z.infer<typeof ContactSchema>) => {
  //     // await signUp(data);
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: 'Success',
  //       description: 'You have successfully signed up!',
  //       variant: 'default',
  //       className: 'text-green-500',
  //     });
  //     form.setValue('fullName', '');
  //     form.setValue('email', '');
  //     form.setValue('phone', '');
  //     form.setValue('message', '');
  //
  //     console.log('Success');
  //     // navigate("/login");
  //   },
  //   onError: (error: unknown) => {
  //     if (error instanceof Error) {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Error occurred while signing up.',
  //         description: error?.message || 'An unknown error occurred.',
  //         action: <ToastAction altText="Try again">Try again</ToastAction>,
  //       });
  //       console.log(error.message);
  //     }
  //
  //     console.log('Error:', error);
  //   },
  // });

  const onSubmit = (data: z.infer<typeof ProductSchema>) => {
    // mutate(data);
  };

  return (
    <div className="w-full space-y-10 transition-all duration-300 mt-4 mb-10 p-4">
      <div className={'flex flex-row gap-4 max-sm:flex-col  max-sm:gap-10'}>
        <div className="">
          {/*<Card className="w-full border-none">*/}
          {/*<CardContent>*/}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={'flex flex-col gap-6'}>
              <div className="flex flex-col gap-6 ">
                <div className={'flex flex-row justify-between gap-6 max-xmd:flex-col max-md:flex-col flex-wrap'}>
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
                              placeholder="Your name"
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
                              placeholder="Unit Price"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant={'default'}
                className={`disabled:cursor-not-allowed disabled:bg-slate-800`}
                // disabled={isPending}
              >
                {/*{isPending ? (*/}
                {/*  <>*/}
                {/*    <VscLoading className="mr-2 animate-spin spin-in-180" />*/}
                {/*    <span>Message Sending....</span>*/}
                {/*  </>*/}
                {/*) : (*/}
                {/*  'Send Message'*/}
                {/*)}*/}
              </Button>
            </form>
          </Form>
          {/*</CardContent>*/}
          {/*</Card>*/}
        </div>
      </div>
    </div>
  );
}
