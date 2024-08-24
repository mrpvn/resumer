import React, { useState } from 'react'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from '../ui/input';
import { EducationFormSchema } from '@/lib/form-validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import { Textarea } from '../ui/textarea';


const EducationalForm = () => {
  const formFeild = {
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  }
  const [educational, setEducation] = useState([formFeild]);

    // 1. Define your form.
    const form = useForm<z.infer<typeof EducationFormSchema>>({
      resolver: zodResolver(EducationFormSchema),
      defaultValues: formFeild
    })
    
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof EducationFormSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add your educational details</p>
      {
        educational?.map((item, i) => {
          return (
            <div key={i}>
                 <Form {...form}>
                    <form className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg' onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="universityName"
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
                        name="degree"
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
                        name="major"
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
                        name="description"
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

export default EducationalForm