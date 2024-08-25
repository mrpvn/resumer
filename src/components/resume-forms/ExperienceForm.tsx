import { ExperienceFormSchema } from '@/lib/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea';
import { CirclePlus, MoveLeft, MoveRight } from 'lucide-react';
import { useResumeContext } from '@/context/context';

const ExperienceForm = () => {

  const {setActiveFormIndex} = useResumeContext()

  const formSchema = z.object({
    experiences: z.array(ExperienceFormSchema),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experiences: [{ title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummary: '' }],
    }
  })
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setActiveFormIndex((i:number) => i+1)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const addNewForm = () => append({ title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummary: '' });

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-bold text-lg'>Professional Experience</h2>
          <p>Add your past experience</p>
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
                        name={`experiences.${i}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="SWE" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experiences.${i}.companyName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>

                            <FormControl>
                              <Input placeholder="Microsoft" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experiences.${i}.city`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experiences.${i}.state`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Washington" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experiences.${i}.startDate`}
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
                        name={`experiences.${i}.endDate`}
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
                        name={`experiences.${i}.workSummary`}
                        render={({ field }) => (
                          <FormItem className='col-span-2'>
                            <FormLabel>Work Summary</FormLabel>
                            <FormControl>
                              <Textarea placeholder="work summary..." {...field} />
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

export default ExperienceForm