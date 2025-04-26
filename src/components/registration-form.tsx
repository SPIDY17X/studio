"use client";

import type { FC } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { registerForEvent } from "@/services/event-management";
import { Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

interface RegistrationFormProps {
  eventName: string;
  onRegistrationSuccess: () => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ eventName, onRegistrationSuccess }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const success = await registerForEvent(eventName, values.email);
      if (success) {
        toast({
          title: "Registration Successful!",
          description: `You're registered for ${eventName}. Your ticket is confirmed.`,
          variant: "default", // or "success" if you add a success variant
        });
        form.reset();
        onRegistrationSuccess(); // Call the callback on success
      } else {
        // Assuming the service returns false for duplicate or other errors
        toast({
          title: "Registration Failed",
          description: "This email is already registered or registration failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/90">Email Address</FormLabel>
              <FormControl>
                 <div className="relative">
                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input placeholder="your.email@example.com" {...field} className="pl-10" />
                 </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Registering...' : 'Register & Confirm Ticket'}
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;

