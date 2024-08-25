import React, { useContext } from 'react'
import { Textarea } from '../ui/textarea'
import { SummaryFormSchema } from '@/lib/form-validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { MoveLeft, MoveRight } from 'lucide-react'
import { useResumeContext } from '@/context/context'

const SummaryForm = () => {
    const {setActiveFormIndex} = useResumeContext();

    // 1. Define your form.
    const form = useForm<z.infer<typeof SummaryFormSchema>>({
      resolver: zodResolver(SummaryFormSchema),
      defaultValues: {
        summary: "",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof SummaryFormSchema>) {
      setActiveFormIndex((i:number) => i+1)
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4'>
    <h2 className='font-bold text-lg'>Summary</h2>
    <p>Add summary for your job title</p>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className='mt-7'>
              <FormLabel>Add Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="I'm a full stack developer..." {...field} />
              </FormControl>
              <FormDescription>
              Provide a brief summary that highlights your key skills, experiences, and career goals. This is your opportunity to introduce yourself and make a strong first impression.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-3'>
          <Button onClick={() => setActiveFormIndex((i: number) => i-1)} className="flex gap-1" type="button"><MoveLeft size={20}/> Prev</Button>
          <Button className="flex gap-1" type="submit">Next <MoveRight size={20} /></Button>
        </div>
      </form>
    </Form>
</div>
  )
}

export default SummaryForm