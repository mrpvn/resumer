import React, { useState } from 'react'
import { Slider } from '../ui/slider'
import { Input } from '../ui/input'
import { MoveLeft, MoveRight } from 'lucide-react'
import { Button } from '../ui/button'
import { SkillsFormSchema } from '@/lib/form-validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { z } from 'zod'
import { Label } from '../ui/label'

const SkillForm = () => {
  const [skills, setSkills] = useState([{name: '', rating: 0}])
  const [sliderValue, setSliderValue] = useState([25])

  // 1. Define your form.
  const form = useForm<z.infer<typeof SkillsFormSchema>>({
    resolver: zodResolver(SkillsFormSchema),
    defaultValues: {
      skill: "",
      rating: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SkillsFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add your professional skills</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="border grid grid-cols-2 gap-3 p-3 my-5 rounded-lg">
          <FormField
            control={form.control}
            name="skill"
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
            name="rating"
            render={({ field }) => (
              <FormItem className='flex items-center justify-center gap-1'>
                <FormControl>
                  <Input className='w-4/5' type='range' step={5} min={0} max={100} {...field} />
                </FormControl>
                {field.value}
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
}

export default SkillForm