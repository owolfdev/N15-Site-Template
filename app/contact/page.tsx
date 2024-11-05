import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function Contact(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  const action = async (formData: FormData) => {
    "use server";
    console.log(formData);
    console.log("hello");
  };

  return (
    <div className="flex flex-col items-center max-w-3xl gap-8 pt-12">
      <form
        className="flex-1 flex flex-col sm:w-[500px] w-[300px] gap-4"
        action={action}
      >
        <h1 className="text-6xl font-black">Contact</h1>
        <p className="text-sm text-foreground">
          Have a question or feedback? Use the form below to get in touch with
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 [&>textarea]:mb-3 mt-8">
          <Label htmlFor="name">Name</Label>
          <Input name="name" placeholder="Your name" required />

          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <Label htmlFor="message">Message</Label>
          <Textarea
            name="message"
            placeholder="Your message"
            required
            className="min-h-[100px]"
          />

          <SubmitButton pendingText="Sending...">Send Message</SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
