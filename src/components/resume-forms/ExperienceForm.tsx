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
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { UpdateResume } from '@/services/api.svc';
import { useMutation } from '@tanstack/react-query';

const ExperienceForm = () => {

  const {setActiveFormIndex, setFormPreview} = useResumeContext()
  const params = useParams();
  const { id } = params;
  const {toast} = useToast();

    const mutation = useMutation({
      mutationFn: UpdateResume,
      onSuccess: () => {
        // Invalidate and refetch queries on success (optional)
        // queryClient.invalidateQueries(['resumes']);
        setActiveFormIndex((i:number) => i+1)
        toast({
          description: "Experience has been updated successfully!",
        })
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          description: "Experience detail update failed!",
        })
      }
    });

  const formSchema = z.object({
    experiences: z.array(ExperienceFormSchema),
  });

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({values, id});
  }

  function handleFieldChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: any, index: number){
    const {name, value} = e.target
    const fieldName = name.split(".")[2] 
    field.onChange(value);
    setFormPreview((prevState: FormPreviewType) => {
      const updatedExperience = [...prevState.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [fieldName]: value,
      };
      return {
        ...prevState,
        experience: updatedExperience
      };
    })
  }

  function handleFieldRemove(i:number){
    remove(i)
    setFormPreview((prevState: FormPreviewType) => {
      const updatedExperience = [...prevState.experience];
      updatedExperience.splice(i, 1);
      return {
        ...prevState,
        experience: updatedExperience
      }
    })
  }

  const addNewForm = () => append({ title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummary: '' })
  

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
                              <Input placeholder="SWE" {...field} onChange={(e) => handleFieldChange(e, field, i)} />
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
                              <Input placeholder="Microsoft" {...field} onChange={(e) => handleFieldChange(e, field, i)} />
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
                              <Input placeholder="New York" {...field} onChange={(e) => handleFieldChange(e, field, i)} />
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
                              <Input placeholder="Washington" {...field} onChange={(e) => handleFieldChange(e, field, i)} />
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
                              <Input type='date' {...field} onChange={(e) => handleFieldChange(e, field, i)} />
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
                              <Input type='date' {...field} onChange={(e) => handleFieldChange(e, field, i)} />
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
                              <Textarea placeholder="work summary..." {...field} onChange={(e) => handleFieldChange(e, field, i)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {i === 0 ? <>
                        <Button onClick={() => setActiveFormIndex((i: number) => i-1)} className="flex gap-1" type="button"><MoveLeft size={20}/> Prev</Button>
                        <Button className="flex gap-1" type="submit">Next <MoveRight size={20} /></Button></>
                        : <Button className='col-span-2' onClick={() => handleFieldRemove(i)} variant='destructive' type='button'>Remove</Button>
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