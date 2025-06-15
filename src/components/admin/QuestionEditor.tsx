
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
  examType: z.string().nonempty("Please select an exam type."),
  category: z.string().nonempty("Please select a category."),
  subject: z.string().nonempty("Please select a subject."),
  year: z.string().nonempty("Please select a year or grade level."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  timeAllowed: z.coerce.number().positive().optional(),
  timeUnit: z.enum(["seconds", "minutes"]).default("minutes"),
  questionType: z.enum(["multiple-choice-single"]), // For now, only this type
  options: z.array(optionSchema).min(2, "Please provide at least two options."),
  correctAnswerIndex: z.string().nonempty("Please select the correct answer."),
  hint: z.string().optional(),
  explanation: z.string().optional(),
  tags: z.string().optional(),
});

type QuestionFormValues = z.infer<typeof questionFormSchema>;

const defaultValues: Partial<QuestionFormValues> = {
  questionText: "",
  difficulty: "Medium",
  questionType: "multiple-choice-single",
  options: [{ text: "" }, { text: "" }],
  timeUnit: "minutes",
};

const examTypes = ["Entrance Exam", "Exit Exam", "Mid-term", "Final", "Quiz"];
const categories = ["Aptitude", "General Knowledge", "Science", "Mathematics", "History", "English", "Logic", "Programming"];
const subjectsByExamType: Record<string, string[]> = {
  "Entrance Exam": ["English", "Mathematics", "Aptitude", "General Knowledge", "Physics", "Chemistry", "Biology"],
  "Exit Exam": ["Computer Science", "Mechanical Engineering", "Civil Engineering", "Medicine", "Law", "Economics", "Business Administration"],
  "Mid-term": ["Calculus", "Organic Chemistry", "World History", "Literature", "Data Structures"],
  "Final": ["Advanced Physics", "Biochemistry", "Geopolitics", "Macroeconomics", "Algorithms"],
  "Quiz": ["General Trivia", "Pop Culture", "Riddles"],
};
const years = ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Freshman", "Sophomore", "Junior", "Senior", "Graduate"];
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

  const watchedExamType = form.watch("examType");
  const subjects = subjectsByExamType[watchedExamType] || [];

  function onSubmit(data: QuestionFormValues) {
    console.log("Form submitted:", data);
    // In a real app, you'd send this to your backend.
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-100">Create New Question</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Fill out the form to add a new question to the question bank.</p>
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
                <FormDescription>This is the main question that students will see. Rich text editing is coming soon.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="examType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select exam type" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {examTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category / Topic</FormLabel>
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
                  <Select onValueChange={field.onChange} value={field.value} disabled={!watchedExamType}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select exam type first.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year / Grade Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a year" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
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
            <div className="grid grid-cols-2 gap-2 items-end">
              <FormField
                control={form.control}
                name="timeAllowed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Allowed</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeUnit"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="seconds">Seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
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
            name="hint"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Hint (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a small hint for the student."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This can be shown to students in practice mode.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Explanation (Optional)</FormLabel>
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

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Tags / Keywords (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. algebra, calculus, ww2" {...field} />
                </FormControl>
                <FormDescription>Comma-separated tags for better organization and search.</FormDescription>
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
