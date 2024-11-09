import { z } from "zod";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// Define Zod schema
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email is too long"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
});

export default async function Contact(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  const action = async (formData: FormData) => {
    "use server";

    // Convert FormData to an object
    const formObject = Object.fromEntries(formData.entries());

    // Validate form data with Zod
    const parsedData = ContactSchema.safeParse(formObject);

    if (!parsedData.success) {
      // Handle validation errors
      console.error(parsedData.error.format());
      throw new Error(
        "Validation failed. Please check your input and try again."
      );
    }

    const { name, email, message } = parsedData.data;

    // Create Supabase client
    const supabase = await createClient();

    // Insert data into Supabase
    const { error } = await supabase
      .from("mdxblog_contact_messages")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Error inserting into Supabase:", error);
      throw new Error("Failed to submit your message. Please try again later.");
    }

    redirect("/contact/thank-you");

    console.log("Form data successfully saved to Supabase!");
  };

  return (
    <div className="flex flex-col items-center max-w-3xl gap-8 pt-12">
      <form
        className="flex-1 flex flex-col sm:w-[600px] w-[300px] gap-4"
        action={action}
      >
        <h1 className="text-6xl font-black">Contact</h1>
        <p className="text-sm text-foreground">
          Have a question or feedback? Use the form below to get in touch with
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 [&>textarea]:mb-3 mt-8">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Your name"
            required
            className="text-lg"
          />

          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="text-lg"
          />

          <Label htmlFor="message">Message</Label>
          <Textarea
            name="message"
            placeholder="Your message"
            required
            className="min-h-[100px] text-lg"
          />

          <SubmitButton pendingText="Sending...">Send Message</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
