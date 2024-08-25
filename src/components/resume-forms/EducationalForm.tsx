import React, { useState } from 'react'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from '../ui/input';
import { EducationFormSchema } from '@/lib/form-validation';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { CirclePlus, MoveLeft, MoveRight } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { useResumeContext } from '@/context/context';


const EducationalForm = () => {
  const {setActiveFormIndex} = useResumeContext();

  const formSchema = z.object({
    academics: z.array(EducationFormSchema),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      academics: [{universityName: '', degree: '', major: '', startDate: '', endDate: '', description: ''}]
    }
  })
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academics",
  });
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setActiveFormIndex((i:number) => i+1)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const addNewForm = () => append({ universityName: '', degree: '', major: '', startDate: '', endDate: '', description: '' });

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-bold text-lg'>Education</h2>
          <p>Add your educational details</p>
        </div>
        <CirclePlus onClick={addNewForm} size={36} className='cursor-pointer hover:scale-90 transition-all' absoluteStrokeWidth />
      </div>
      {
        fields?.map((item, i) => {
          return (
            <div key={item.id}>
                 <Form {...form}>
                    <form className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg' onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name={`academics.${i}.universityName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>University Name</FormLabel>

                            <FormControl>
                              <Input placeholder="Delhi University" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`academics.${i}.degree`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                              <Input placeholder="Bachelor" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`academics.${i}.major`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Major</FormLabel>
                            <FormControl>
                              <Input placeholder="Computer Applicatons" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`academics.${i}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`academics.${i}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`academics.${i}.description`}
                        render={({ field }) => (
                          <FormItem className='col-span-2'>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="description..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {i === 0 ? <>
                        <Button onClick={() => setActiveFormIndex((i: number) => i-1)} className="flex gap-1" type="button"><MoveLeft size={20}/> Prev</Button>
                        <Button className="flex gap-1" type="submit">Next <MoveRight size={20} /></Button></>
                        : <Button className='col-span-2' onClick={() => remove(i)} variant='destructive' type='button'>Remove</Button>
                      }
                    </form>
                  </Form>
            </div>
          )
        })
      }
    </div>
  )
}

export default EducationalForm