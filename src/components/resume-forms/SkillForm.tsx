import React from 'react'
import { Input } from '../ui/input'
import { CirclePlus, MoveLeft, MoveRight } from 'lucide-react'
import { Button } from '../ui/button'
import { SkillsFormSchema } from '@/lib/form-validation'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { z } from 'zod'
import { it } from 'node:test'

const SkillForm = () => {

  const formSchema = z.object({
    skills: z.array(SkillsFormSchema),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [{skill: "", rating: ""}]
    },
  })

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const addNewForm = () => append({skill: "", rating: ""});

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-bold text-lg'>Skills</h2>
          <p>Add your professional skills</p>
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
                    name={`skills.${i}.skill`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill</FormLabel>
                        <FormControl>
                          <Input placeholder="React JS" {...field} />
                        </FormControl>
                        <FormDescription>
                          Add your skills here and rate it
                        </FormDescription>
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
                          <Input className='w-4/5' defaultValue={10} type='range' step={5} min={0} max={100} {...field} />
                        </FormControl>
                        {field.value}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {i === 0 ? <>
                    <Button className="flex gap-1" type="button"><MoveLeft size={20}/> Prev</Button>
                    <Button className="flex gap-1" type="submit">Next <MoveRight size={20} /></Button></>
                    : <Button className='col-span-2' onClick={() => remove(i)} variant='destructive' type='button'>Delete</Button>
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