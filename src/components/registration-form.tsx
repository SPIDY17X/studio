

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
import { Mail, Ticket, Phone } from 'lucide-react'; // Added Phone icon

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }).regex(/^\+?[0-9\s-()]*$/, { // Basic regex for digits, optional +, spaces, hyphens, parentheses
     message: "Please enter a valid phone number.",
  }),
});

interface RegistrationFormProps {
  eventName: string;
  // Update prop type to accept email and phone number on success
  onRegistrationSuccess: (details: { email: string; phoneNumber: string }) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ eventName, onRegistrationSuccess }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Call registerForEvent with email and phone number
      const success = await registerForEvent(eventName, values.email, values.phoneNumber);
      if (success) {
        toast({
          title: "Registration Successful!",
          description: `Your ticket for ${eventName} is confirmed.`,
          variant: "default", // or "success" if you add a success variant
        });
        // Call the callback with both email and phone number
        onRegistrationSuccess({ email: values.email, phoneNumber: values.phoneNumber });
        form.reset(); // Reset form after successful registration and callback
      } else {
        // Updated failure message
        toast({
          title: "Registration Failed",
          description: "This email or phone number is already registered for this event (possibly with a different pair), the event might be full, or the registration encountered an issue.",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> {/* Reduced space-y */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/90">Email Address</FormLabel>
              <FormControl>
                 <div className="relative">
                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input type="email" placeholder="your.email@example.com" {...field} className="pl-10" />
                 </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/90">Phone Number</FormLabel>
              <FormControl>
                 <div className="relative">
                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   {/* Updated placeholder */}
                   <Input type="tel" placeholder="e.g., +91 98XXX XXXXX" {...field} className="pl-10" />
                 </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-6" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting ? 'Registering...' : (
             <>
               <Ticket className="mr-2 h-4 w-4" /> Register & Confirm Ticket
             </>
           )}
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
