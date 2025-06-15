
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Plus } from "lucide-react";

const optionSchema = z.object({
  text: z.string().min(1, "Option text cannot be empty."),
});

const questionFormSchema = z.object({
  questionText: z.string().min(10, "Question text must be at least 10 characters long."),
  category: z.string().nonempty("Please select a category."),
  subject: z.string().nonempty("Please select a subject."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  questionType: z.enum(["multiple-choice-single"]), // For now, only this type
  options: z.array(optionSchema).min(2, "Please provide at least two options."),
  correctAnswerIndex: z.string().nonempty("Please select the correct answer."),
  explanation: z.string().optional(),
});

type QuestionFormValues = z.infer<typeof questionFormSchema>;

const defaultValues: Partial<QuestionFormValues> = {
  questionText: "",
  difficulty: "Medium",
  questionType: "multiple-choice-single",
  options: [{ text: "" }, { text: "" }],
};

const categories = ["General Knowledge", "Science", "Mathematics", "History"];
const subjects = ["English", "Mathematics", "Biology", "Chemistry", "Physics"];
const difficulties = ["Easy", "Medium", "Hard"];

export function QuestionEditor() {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  function onSubmit(data: QuestionFormValues) {
    console.log("Form submitted:", data);
    // In a real app, you'd send this to your backend.
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">Create New Question</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="questionText"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the question text here. I can add a rich text editor later!"
                    className="min-h-[150px] text-base"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is the main question that students will see.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {difficulties.map(dif => <SelectItem key={dif} value={dif}>{dif}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormItem>
            <FormLabel className="text-lg">Answer Options</FormLabel>
            <FormDescription>
              Provide the choices for this multiple-choice question. Mark the correct one using the radio button.
            </FormDescription>
            <FormField
              control={form.control}
              name="correctAnswerIndex"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-4 pt-2"
                >
                  {fields.map((item, index) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name={`options.${index}.text`}
                      render={({ field: optionField }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center w-full gap-4">
                              <RadioGroupItem value={String(index)} id={`correct-answer-${index}`} />
                              <Input {...optionField} placeholder={`Option ${index + 1}`} className="flex-1" />
                              <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 2}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => append({ text: "" })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Option
            </Button>
              <FormMessage className="pt-2">
              {form.formState.errors.options?.root?.message}
            </FormMessage>
          </FormItem>

          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Explanation</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Explain why the correct answer is correct."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This will be shown to students after they answer.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline">Save as Draft</Button>
            <Button type="submit">Save Question</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default QuestionEditor;
