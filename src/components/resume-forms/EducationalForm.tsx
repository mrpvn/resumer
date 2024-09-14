import React, { useEffect, useState } from 'react'
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
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateResume } from '@/services/api.svc';


const EducationalForm = ({resume}:{resume:any}) => {
  const {setActiveFormIndex, setFormPreview} = useResumeContext();
  const params = useParams();
  const queryClient = useQueryClient();
  const { id } = params;
  const {toast} = useToast();

    const mutation = useMutation({
      mutationFn: UpdateResume,
      onSuccess: () => {
        // Invalidate and refetch queries on success (optional)
        queryClient.invalidateQueries({queryKey: ['resume']});
        setActiveFormIndex((i:number) => i+1)
        toast({
          description: "Education details has been updated successfully!",
        })
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          description: "Education detail update failed!",
        })
      }
    });

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
  const { control, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academics",
  });

  useEffect(() => {
    if (resume?.academics && Array.isArray(resume.academics)) {
      reset({
        academics: resume.academics.length
          ? resume.academics
          : [{universityName: '', degree: '', major: '', startDate: '', endDate: '', description: ''}],
      });
    }
  }, [resume, reset]);
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({values, id});
  }

  function handleFieldChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: any, index: number){
    const {name, value} = e.target
    const fieldName = name.split(".")[2] 
    field.onChange(value);
    setFormPreview((prevState: FormPreviewType) => {
      const updatedEducation = [...prevState.academics];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [fieldName]: value,
      };
      return {
        ...prevState,
        academics: updatedEducation
      };
    })
  }

  function handleFieldRemove(i:number){
    remove(i)
    setFormPreview((prevState: FormPreviewType) => {
      const updatedEducation = [...prevState.academics];
      updatedEducation.splice(i, 1);
      return {
        ...prevState,
        education: updatedEducation
      }
    })
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
                              <Input placeholder="Delhi University" {...field} onChange={(e) => handleFieldChange(e, field, i)} />
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
                              <Input placeholder="Bachelor" {...field} onChange={(e) => handleFieldChange(e, field, i)}/>
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
                              <Input placeholder="Computer Applicatons" {...field} onChange={(e) => handleFieldChange(e, field, i)}/>
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
                              <Input type='date' {...field} onChange={(e) => handleFieldChange(e, field, i)}/>
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
                              <Input type='date' {...field} onChange={(e) => handleFieldChange(e, field, i)}/>
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
                              <Textarea placeholder="description..." {...field} onChange={(e) => handleFieldChange(e, field, i)}/>
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

export default EducationalForm