"use client";

import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
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
import { EducationSchema, EducationSchemaType } from "@/lib/form-validation";
import { FormProps } from "@/lib/types";

const EducationForm = ({ resumeData, setResumeData }: FormProps) => {
  const form = useForm<EducationSchemaType>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      educations: resumeData?.educations?.map((exp) => ({
        institution: exp.institutionName || undefined,
        location: exp.location || undefined,
        degree: exp.degree || undefined,
        startDate: exp.startDate ? exp.startDate.toString() : undefined,
        endDate: exp.endDate ? exp.endDate.toString() : undefined,
        cgpa: exp.cgpa || undefined,
        subjects: exp.subjects || undefined,
      })) || [
        {
          institution: "",
          location: "",
          degree: "",
          startDate: "",
          endDate: "",
          cgpa: "",
          subjects: "",
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
        educations:
          values.educations?.map((edu) => ({
            institutionName: edu?.institution || null,
            location: edu?.location || null,
            degree: edu?.degree || null,
            startDate: edu?.startDate ? new Date(edu.startDate) : null,
            endDate: edu?.endDate ? new Date(edu.endDate) : null,
            cgpa: edu?.cgpa || null,
            subjects: edu?.subjects || null,
          })) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "educations",
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
          <h2 className="font-bold text-lg">Education Information</h2>
          <p>Add your education information</p>
        </div>
        <Button
          type="button"
          className="cursor-pointer"
          onClick={() =>
            append({
              institution: "",
              location: "",
              degree: "",
              startDate: "",
              endDate: "",
              cgpa: "",
              subjects: "",
            })
          }
        >
          Add Education
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
            <EducationItem
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

interface EducationItemProps {
  id: string;
  form: UseFormReturn<EducationSchemaType>;
  index: number;
  remove: (index: number) => void;
}

function EducationItem({ id, form, index, remove }: EducationItemProps) {
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
        "my-6 border rounded-md bg-background max-sm:p-3 sm:p-3 md:p-6",
        isDragging && "shadow-xl z-50 cursor-grabbing relative"
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between">
        <span className="font-semibold">Education Information {index + 1}</span>
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
            name={`educations.${index}.institution`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Name</FormLabel>
                <FormControl>
                  <Input placeholder="MIT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`educations.${index}.location`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="New Delhi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`educations.${index}.degree`}
            render={({ field }) => (
              <FormItem className="col-span-2 lg:col-span-1">
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="B.Tech in computer Science"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name={`educations.${index}.startDate`}
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
              name={`educations.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input placeholder="End Date" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={`educations.${index}.cgpa`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  CGPA (Mention on a scale of 10 Example: 8.75)
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="CGPA (Mention on a scale of 10 Example: 8.75)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`educations.${index}.subjects`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Relevant Coursework</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Please provide the names of few subjects you have studied in your recent Education/Degree"
                    {...field}
                  />
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

export default EducationForm;
