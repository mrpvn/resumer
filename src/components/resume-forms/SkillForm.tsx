import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { CirclePlus, MoveLeft, MoveRight } from 'lucide-react'
import { Button } from '../ui/button'
import { SkillsFormSchema } from '@/lib/form-validation'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { z } from 'zod'
import { useResumeContext } from '@/context/context'
import { useParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateResume } from '@/services/api.svc'
import { useRouter } from 'next/navigation'

const SkillForm = ({resume}:{resume:any}) => {

  const {setActiveFormIndex, setFormPreview} = useResumeContext();
  const params = useParams();
  const { id } = params;
  const queryClient = useQueryClient();
  const router = useRouter();
  const {toast} = useToast();

    const mutation = useMutation({
      mutationFn: UpdateResume,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['resume']});
        toast({
          description: "Skill has been updated successfully!",
        })
        router.push(`/dashboard/resume/${id}/view`)
        
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          description: "Skill detail update failed!",
        })
      }
    });

  const formSchema = z.object({
    skills: z.array(SkillsFormSchema),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [{name: "", rating: ""}]
    },
  })

  const { control, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  useEffect(() => {
    if (resume?.skills && Array.isArray(resume.skills)) {
      reset({
        skills: resume.skills.length
          ? resume.skills
          : [{name: "", rating: ""}],
      });
    }
  }, [resume, reset]);
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({values, id});
  }

  function handleFieldChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: any, index: number){
    const {name, value} = e.target
    const fieldName = name.split(".")[2] 
    field.onChange(value);
    setFormPreview((prevState: FormPreviewType) => {
      const updatedSkills = [...prevState.skills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [fieldName]: value,
      };
      return {
        ...prevState,
        skills: updatedSkills
      };
    })
  }

  function handleFieldRemove(i:number){
    remove(i)
    setFormPreview((prevState: FormPreviewType) => {
      const updatedSkills = [...prevState.skills];
      updatedSkills.splice(i, 1);
      return {
        ...prevState,
        skills: updatedSkills
      }
    })
  }

  const addNewForm = () => append({name: "", rating: ""});

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-bold text-lg'>Add Skills</h2>
          <p>List your skills and rate your proficiency to highlight your expertise</p>
        </div>
        <CirclePlus onClick={addNewForm} size={36} className='cursor-pointer hover:scale-90 transition-all' absoluteStrokeWidth />
      </div>
      {
        fields?.map((item, i) => {
          return(
            <div key={item.id}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="border grid grid-cols-2 gap-3 p-3 my-5 rounded-lg">
                  <FormField
                    control={form.control}
                    name={`skills.${i}.name`}
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Skill</FormLabel> */}
                        <FormControl>
                          <Input placeholder="React JS" {...field} onChange={(e) => handleFieldChange(e, field, i)}/>
                        </FormControl>
                        {/* <FormDescription>
                          List your skills and rate your proficiency to highlight your expertise.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`skills.${i}.rating`}
                    render={({ field }) => (
                      <FormItem className='flex items-center justify-center gap-1'>
                        <FormControl>
                          <Input className='w-4/5' defaultValue={10} type='range' step={5} min={0} max={100} {...field} onChange={(e) => handleFieldChange(e, field, i)}/>
                        </FormControl>
                        <FormMessage />
                        {field.value}
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

export default SkillForm