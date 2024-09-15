import React, { useContext, useEffect, useState } from 'react'
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
import { Bot, Copy, MoveLeft, MoveRight } from 'lucide-react'
import { useResumeContext } from '@/context/context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateResume } from '@/services/api.svc'
import { useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import GenerativeAI from '@/services/gemini.ai'
import { Skeleton } from '../ui/skeleton'

const SummaryForm = ({resume}:{resume:any}) => {
    const {setActiveFormIndex, setFormPreview} = useResumeContext();
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(false);
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

    async function generateSummaryFromAI(){
      const PROMPT = `
          Generate a JSON response containing a resume summary for the role of "${resume.jobTitle}" across three experience levels: "Fresher", "Mid-level", and "Experienced". Each entry in the JSON should have:

          1. "experience_level": Specify the level (e.g., Fresher, Mid-level, Experienced).
          2. "summary": Provide a 4-5 line summary that highlights relevant skills, technologies, and key achievements based on the experience level. The summary should be professional and concise.

         The JSON should be a flat array of objects, with no additional keys.
        `
      setLoading(true);
      const result = await GenerativeAI(PROMPT);
      const response = await JSON.parse(result.response.text());
      setSummaries(response);
      setLoading(false);
    }

    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        toast({
          description: "Copied to clipboard!!",
        })
      }).catch(err => {
        toast({
          variant: "destructive",
          description: err,
        })
      });
    };

  return (
    <>
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
                <div className='flex justify-between items-end'>
                  <FormLabel>Add Summary</FormLabel>
                  <Button onClick={generateSummaryFromAI} type='button' className='border-primary text-primary hover:text-primary' variant="outline">Generate from AI <Bot className='ml-1' size={20}/></Button>
                </div>
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
      <div>
        {
          (!summaries || loading) ? (
            <div className='flex flex-col gap-2'>
              <Skeleton className='w-full h-[120px]'/>
              <Skeleton className='w-full h-[120px]'/>
              <Skeleton className='w-full h-[120px]'/>
            </div>
          ) : (
            <div>
              {
                summaries?.map((summary:any, i:number) => {
                  return(
                      <div className='mb-2 bg-slate-200 rounded-md p-4' key={i}>
                        <div className='flex justify-between'>
                          <h2 className='text-lg font-semibold'>{summary.experience_level}</h2>
                          <Copy onClick={() => copyToClipboard(summary.summary)} className='cursor-pointer hover:scale-90 transition-all' size={16} />
                        </div>
                        <p className='text-sm'>{summary.summary}</p>
                      </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    </>
  )
}

export default SummaryForm