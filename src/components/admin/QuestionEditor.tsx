import React, { useState } from "react";
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
import { X, Plus, Save, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const optionSchema = z.object({
  text: z.string().min(1, "Option text cannot be empty."),
});

const questionFormSchema = z.object({
  questionText: z.string().min(10, "Question text must be at least 10 characters long."),
  examType: z.string().nonempty("Please select an exam type."),
  subject: z.string().nonempty("Please select a subject."),
  year: z.string().nonempty("Please enter the exam year."),
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
  questionType: "multiple-choice-single",
  options: [{ text: "" }, { text: "" }],
  timeUnit: "minutes",
};

const initialExamTypes = ["Entrance Exam", "Exit Exam", "Work Exam", "NGAT Exam"];
const initialSubjectsByExamType: Record<string, string[]> = {
  "Entrance Exam": ["English", "Mathematics", "Aptitude", "General Knowledge", "Physics", "Chemistry", "Biology"],
  "Exit Exam": ["Computer Science", "Mechanical Engineering", "Civil Engineering", "Medicine", "Law", "Economics", "Business Administration"],
  "Work Exam": ["Professional Communication", "Software Development", "Project Management", "Financial Accounting"],
  "NGAT Exam": ["Verbal Reasoning", "Numerical Reasoning", "Abstract Reasoning", "Situational Judgement"],
};

// Function to track web transactions
const trackWebTransaction = async (transactionType: string, metadata: any = {}) => {
  try {
    await supabase.from('web_transactions').insert({
      transaction_type: transactionType,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      session_id: sessionStorage.getItem('session_id') || 'anonymous',
      metadata: metadata
    });
  } catch (error) {
    console.error('Error tracking transaction:', error);
  }
};

export function QuestionEditor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const [examTypes, setExamTypes] = useState(initialExamTypes);
  const [newExamType, setNewExamType] = useState("");
  const [showNewExamTypeInput, setShowNewExamTypeInput] = useState(false);

  const [subjectsByExamType, setSubjectsByExamType] = useState(initialSubjectsByExamType);
  const [newSubject, setNewSubject] = useState("");
  const [showNewSubjectInput, setShowNewSubjectInput] = useState(false);

  const watchedExamType = form.watch("examType");
  const subjects = subjectsByExamType[watchedExamType] || [];

  const handleAddNewExamType = () => {
    if (newExamType && !examTypes.includes(newExamType)) {
      const trimmedExamType = newExamType.trim();
      if(trimmedExamType){
        setExamTypes(prev => [...prev, trimmedExamType]);
        setSubjectsByExamType(prev => ({ ...prev, [trimmedExamType]: [] }));
        form.setValue("examType", trimmedExamType, { shouldValidate: true });
        setNewExamType("");
        setShowNewExamTypeInput(false);
      }
    }
  };

  const handleAddNewSubject = () => {
    if (newSubject && watchedExamType && !subjectsByExamType[watchedExamType]?.includes(newSubject)) {
      const trimmedSubject = newSubject.trim();
      if(trimmedSubject) {
        setSubjectsByExamType(prev => {
            const updatedSubjects = { ...prev };
            updatedSubjects[watchedExamType] = [...(updatedSubjects[watchedExamType] || []), trimmedSubject];
            return updatedSubjects;
        });
        form.setValue("subject", trimmedSubject, { shouldValidate: true });
        setNewSubject("");
        setShowNewSubjectInput(false);
      }
    }
  };

  async function onSubmit(data: QuestionFormValues) {
    try {
      setIsSubmitting(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to create questions");
        return;
      }

      // Map the form data to database schema
      const questionData = {
        exam_type: data.examType,
        subject: data.subject,
        year: data.year,
        question_text: data.questionText,
        option_a: data.options[0]?.text || "",
        option_b: data.options[1]?.text || "",
        option_c: data.options[2]?.text || "",
        option_d: data.options[3]?.text || "",
        correct_answer: ['A', 'B', 'C', 'D'][parseInt(data.correctAnswerIndex)],
        explanation: data.explanation || null,
        created_by: user.id,
        is_published: true
      };

      // Insert question into database
      const { data: insertedQuestion, error } = await supabase
        .from('questions')
        .insert(questionData)
        .select()
        .single();

      if (error) {
        console.error('Error saving question:', error);
        toast.error("Error saving question: " + error.message);
        return;
      }

      // Track web transaction
      await trackWebTransaction('question_created', {
        question_id: insertedQuestion.id,
        exam_type: data.examType,
        subject: data.subject,
        year: data.year
      });

      toast.success("Question saved successfully and published to main website!");
      
      // Reset form
      form.reset(defaultValues);
      
    } catch (error) {
      console.error('Error:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function saveAsDraft(data: QuestionFormValues) {
    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to save drafts");
        return;
      }

      const questionData = {
        exam_type: data.examType,
        subject: data.subject,
        year: data.year,
        question_text: data.questionText,
        option_a: data.options[0]?.text || "",
        option_b: data.options[1]?.text || "",
        option_c: data.options[2]?.text || "",
        option_d: data.options[3]?.text || "",
        correct_answer: ['A', 'B', 'C', 'D'][parseInt(data.correctAnswerIndex)],
        explanation: data.explanation || null,
        created_by: user.id,
        is_published: false // Save as draft
      };

      const { error } = await supabase
        .from('questions')
        .insert(questionData);

      if (error) {
        console.error('Error saving draft:', error);
        toast.error("Error saving draft: " + error.message);
        return;
      }

      toast.success("Question saved as draft!");
      
    } catch (error) {
      console.error('Error:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="examType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Type</FormLabel>
                  <div className="flex items-center gap-2">
                    <Select onValueChange={(value) => { field.onChange(value); form.setValue("subject", ""); setShowNewSubjectInput(false); }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select exam type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {examTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" size="icon" onClick={() => setShowNewExamTypeInput(s => !s)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {showNewExamTypeInput && (
                    <div className="flex items-center gap-2 pt-2">
                      <Input
                        placeholder="Add new exam type"
                        value={newExamType}
                        onChange={(e) => setNewExamType(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNewExamType()}
                      />
                      <Button type="button" onClick={handleAddNewExamType}>Add</Button>
                    </div>
                  )}
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
                   <div className="flex items-center gap-2">
                      <Select onValueChange={field.onChange} value={field.value} disabled={!watchedExamType}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Button type="button" variant="outline" size="icon" onClick={() => setShowNewSubjectInput(s => !s)} disabled={!watchedExamType}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {showNewSubjectInput && (
                      <div className="flex items-center gap-2 pt-2">
                        <Input
                          placeholder="Add new subject"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddNewSubject()}
                        />
                        <Button type="button" onClick={handleAddNewSubject}>Add</Button>
                      </div>
                    )}
                  <FormDescription>Select exam type first.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Year</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 2024 or Grade 12" {...field} />
                  </FormControl>
                  <FormDescription>Enter the specific year or grade level.</FormDescription>
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
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.handleSubmit(saveAsDraft)()}
              disabled={isSubmitting}
            >
              <FileText className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save & Publish Question"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default QuestionEditor;
