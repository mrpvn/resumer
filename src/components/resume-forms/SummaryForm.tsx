import React, { useContext, useEffect } from 'react'
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
import { useMutation } from '@tanstack/react-query'
import { UpdateResume } from '@/services/api.svc'
import { useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import Resume from '@/lib/database/models/resume/resume.model'

const SummaryForm = ({resume}:{resume:any}) => {
    const {setActiveFormIndex, setFormPreview} = useResumeContext();
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
          description: "Summary has been updated successfully!",
        })
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          description: "Summary update failed!",
        })
      }
    });

    const form = useForm<z.infer<typeof SummaryFormSchema>>({
      resolver: zodResolver(SummaryFormSchema),
      defaultValues: {
        summary: "",
      },
    })

    const {reset} = form

    useEffect(() => {
      if (resume) {
        reset({
          summary: resume?.summary
        });
      }
    }, [resume, reset])
   
    function onSubmit(values: z.infer<typeof SummaryFormSchema>) {
      mutation.mutate({values, id});
    }

    function handleFieldChange(e:React.ChangeEvent<HTMLTextAreaElement>, field: any){
      const {name, value} = e.target
      field.onChange(value);
      setFormPreview((prevState: FormPreviewType) => ({
        ...prevState,
        summary: {
          [name]: value
        }
      }))
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
                <Textarea placeholder="I'm a full stack developer..." {...field} onChange={(e) => handleFieldChange(e, field)}/>
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