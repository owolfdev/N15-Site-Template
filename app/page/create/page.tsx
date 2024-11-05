import { CreatePostForm } from "./create-post-form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CreatePost() {
  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl sm:text-5xl font-black text-center">
          Create a Post
        </h1>
        <CreatePostForm />
      </div>
      <div className="pt-6">
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/blog"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
