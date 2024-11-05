import React from "react";
import { getPosts } from "@/app/actions/posts/get-posts";
import Link from "next/link";
import type { Post } from "@/types/post-types";

type RelatedPostsListProps = {
  relatedSlugs: string[] | null;
};

const RelatedPostsList = async ({ relatedSlugs }: RelatedPostsListProps) => {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return null;
  }

  // Fetch all posts
  const { posts } = await getPosts({});

  // Filter posts to include only those that match the relatedSlugs
  const relatedPosts = posts.filter((post) => relatedSlugs.includes(post.slug));

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <hr className="pb-8" />
      <h3 className="text-xl font-bold mb-4">Related Posts</h3>
      <ul>
        {relatedPosts.map((post) => (
          <li key={post.slug} className="mb-2">
            <Link
              href={`/blog/${post.slug}`}
              passHref
              className="hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedPostsList;
