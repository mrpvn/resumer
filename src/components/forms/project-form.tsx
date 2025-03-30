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
import { ProjectSchema, ProjectSchemaType } from "@/lib/form-validation";

const ProjectForm = ({ resumeData, setResumeData }: FormProps) => {
  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      projects: resumeData?.projects?.map((project) => ({
        title: project.projectTitle || undefined,
        startDate: project.startDate?.toISOString().split("T")[0] || undefined,
        endDate: project.endDate?.toISOString().split("T")[0] || undefined,
        link: project.link || undefined,
        workSummary: project.projectSummary || undefined,
      })) || [
        {
          title: "",
          startDate: "",
          endDate: "",
          link: "",
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
        projects:
          values.projects?.map((project) => ({
            projectTitle: project?.title || null,
            startDate: project?.startDate ? new Date(project.startDate) : null,
            endDate: project?.endDate ? new Date(project.endDate) : null,
            link: project?.link || null,
            projectSummary: project?.workSummary || null,
          })) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "projects",
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
    <div className="py-5 md:p-5 shadow-lg rounded-lg border-t-4 border-t-primary my-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">Projects Information</h2>
          <p>Add the most recent project on top.</p>
        </div>
        <Button
          type="button"
          className="cursor-pointer"
          onClick={() =>
            append({
              title: "",
              startDate: "",
              endDate: "",
              link: "",
              workSummary: "",
            })
          }
        >
          Add Project
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
            <ProjectItem
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

interface ProjectItemProps {
  id: string;
  form: UseFormReturn<ProjectSchemaType>;
  index: number;
  remove: (index: number) => void;
}

function ProjectItem({ id, form, index, remove }: ProjectItemProps) {
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
        <span className="font-semibold">Project Information {index + 1}</span>
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
            name={`projects.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="My portfolio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name={`projects.${index}.startDate`}
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
              name={`projects.${index}.endDate`}
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
            name={`projects.${index}.link`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="myportfolio.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`projects.${index}.workSummary`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Work Summary</FormLabel>
                <FormControl>
                  <Textarea placeholder="Resume Builder" {...field} />
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

export default ProjectForm;
