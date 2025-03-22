"use client";

import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { FormProps } from "@/lib/types";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import {
  WorkExperienceSchema,
  WorkExperienceSchemaType,
} from "@/lib/form-validation";

const WorkExperienceForm = ({ resumeData, setResumeData }: FormProps) => {
  const form = useForm<WorkExperienceSchemaType>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      workExperiences: resumeData?.workExperiences?.map((exp) => ({
        company: exp.companyName || undefined,
        position: exp.position || undefined,
        startDate: exp.startDate ? exp.startDate.toString() : undefined,
        endDate: exp.endDate ? exp.endDate.toString() : undefined,
        location: exp.location || undefined,
        workSummary: exp.workSummary || undefined,
      })) || [
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          location: "",
          workSummary: "",
        },
      ],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.map((exp, index) => ({
            id: resumeData.workExperiences[index]?.id,
            resumeId: resumeData.id,
            companyName: exp?.company || null,
            position: exp?.position || null,
            startDate: exp?.startDate ? new Date(exp.startDate) : null,
            endDate: exp?.endDate ? new Date(exp.endDate) : null,
            location: exp?.location || null,
            workSummary: exp?.workSummary || null,
          })) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">Work Experience</h2>
          <p>Add your work experience</p>
        </div>
        <Button
          type="button"
          className="cursor-pointer"
          onClick={() =>
            append({
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              location: "",
              workSummary: "",
            })
          }
        >
          Add Experience
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields?.map((field, index) => (
            <WorkExperienceItem
              id={field.id}
              key={field.id}
              form={form}
              index={index}
              remove={remove}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<WorkExperienceSchemaType>;
  index: number;
  remove: (index: number) => void;
}

function WorkExperienceItem({
  id,
  form,
  index,
  remove,
}: WorkExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({ id });
  return (
    <div
      className={cn(
        "my-6 border rounded-md bg-background p-6",
        isDragging && "shadow-xl z-50 cursor-grabbing relative"
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between">
        <span className="font-semibold">Work Experience {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <Form {...form}>
        <form className="grid grid-cols-2 gap-3 border p-3 mt-3 rounded-lg">
          <FormField
            control={form.control}
            name={`workExperiences.${index}.company`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Resumer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`workExperiences.${index}.position`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>

                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name={`workExperiences.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Start Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`workExperiences.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="End Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={`workExperiences.${index}.location`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New Delhi, India"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`workExperiences.${index}.workSummary`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Work Summary</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {index !== 0 && (
            <Button
              className="col-span-2"
              onClick={() => remove(index)}
              variant="destructive"
              type="button"
            >
              Remove
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default WorkExperienceForm;
