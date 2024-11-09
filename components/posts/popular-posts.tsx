import { getPopularPosts } from "@/app/actions/posts/get-popular-posts";
import Link from "next/link";

export default async function PopularPostsPage() {
  const result = await getPopularPosts();

  if (!result.ok) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-lg text-gray-700">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="text-4xl font-black mb-8">Popular Posts</h1>
      <ul className="flex flex-col gap-8">
        {result.data?.map((post) => (
          <li
            key={post.id}
            className="border-none sm:border rounded-lg py-2 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="flex flex-col gap-4">
                <h2 className="font-black text-5xl">{post.title}</h2>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 w-10/12">
                    {post.description}
                  </p>

                  <p className="text-sm rounded-lg px-3 py-2 bg-primary text-secondary">
                    Likes: {post.likes}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
