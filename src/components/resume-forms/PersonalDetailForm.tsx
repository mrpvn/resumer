import { z } from "zod"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PersonalDetailFormSchema } from '@/lib/form-validation'
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MoveLeft, MoveRight } from "lucide-react"
import { useResumeContext } from "@/context/context"
import { CreateResumeField, GetResumeField } from "@/services/api.svc"
import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

const PersonalDetailForm = () => {
    const {activeFormIndex, setActiveFormIndex, setFormPreview, } = useResumeContext();

    const {userId} = useAuth();

    const {data: fieldData} = useQuery({
      queryKey: ["personalDetail"],
      queryFn: () => {
        GetResumeField(userId as string)
      }
    })

    const form = useForm<z.infer<typeof PersonalDetailFormSchema>>({
      resolver: zodResolver(PersonalDetailFormSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        jobTitle: "",
        address: "",
        phone: "",
        email: "",
      },
    })
   
    async function onSubmit(values: z.infer<typeof PersonalDetailFormSchema>) {
      setActiveFormIndex((i:number) => i+1)
      const payload = {...values, createdBy: userId};
      const personalData = await CreateResumeField(payload);
    }

    function handleFieldChange(e:React.ChangeEvent<HTMLInputElement>, field: any){
      const {name, value} = e.target
      field.onChange(value);
      setFormPreview((prevState: FormPreviewType) => ({
        ...prevState,
        personalDetail: {
          ...prevState.personalDetail,
          [name]: value
        }
      }))
    }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get started with basis information</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 mt-5 gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jhon" {...field} onChange={(e) => handleFieldChange(e, field)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                <Input placeholder="Doe" {...field} onChange={(e) => handleFieldChange(e, field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Full stack developer" {...field} onChange={(e) => handleFieldChange(e, field)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="A-1, New York" {...field} onChange={(e) => handleFieldChange(e, field)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (123) 456-7890" {...field} onChange={(e) => handleFieldChange(e, field)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jhon@gmail.com" {...field} onChange={(e) => handleFieldChange(e, field)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={activeFormIndex <= 1} className="flex gap-1" type="button"><MoveLeft size={20}/> Prev</Button>
          <Button className="flex gap-1" type="submit">Next <MoveRight size={20} /></Button>
        </form>
      </Form>
    </div>
  )
}

export default PersonalDetailForm