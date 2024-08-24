import { ExperienceFormSchema } from '@/lib/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea';
import { MoveLeft, MoveRight } from 'lucide-react';

const ExperienceForm = () => {
  const formFeild = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: ''
  }
  const [experience, setExperience] = useState([formFeild]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof ExperienceFormSchema>>({
    resolver: zodResolver(ExperienceFormSchema),
    defaultValues: formFeild
  })
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ExperienceFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4'>
      <h2 className='font-bold text-lg'>Professional Experience</h2>
      <p>Add your past experience</p>
      {
        experience?.map((item, i) => {
          return (
            <div key={i}>
                 <Form {...form}>
                    <form className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg' onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="title"
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
                        name="companyName"
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
                        name="city"
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
                        name="state"
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
                        name="startDate"
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
                        name="endDate"
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
                        name="workSummary"
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
                      <Button className="flex gap-1" type="button"><MoveLeft size={20}/> Prev</Button>
                      <Button className="flex gap-1" type="submit">Next <MoveRight size={20} /></Button>
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