"use server";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@/utils/supabase/server";

import { config } from "@/lib/config/config";
import { parseISO, startOfDay } from "date-fns";

function extractMetadata(fileContents: string) {
  const metadataMatch = fileContents.match(
    /export const metadata = ({[\s\S]*?});/
  );
  if (metadataMatch) {
    // biome-ignore lint/security/noGlobalEval: <explanation>
    const metadata = eval(`(${metadataMatch[1]})`);
    return metadata;
  }
  return null;
}

async function fetchLikesCount(postId: string) {
  const supabase = await createClient();
  const tableName = config.likesTable;
  const { count, error } = await supabase
    .from(tableName)
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) {
    console.error(`Error fetching likes for postId: ${postId}`, error);
    return 0;
  }

  return count || 0;
}

export async function generatePostsCache() {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(
      (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
    );

  const currentDate = startOfDay(new Date());

  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const metadata = extractMetadata(fileContents);

      if (!metadata) {
        console.warn(`Metadata missing for file: ${fileName}`);
        return null;
      }

      const postId = metadata.id;
      const likesCount = await fetchLikesCount(postId);

      const slug = fileName.replace(".mdx", "");

      const post = {
        slug,
        ...metadata,
        likes: likesCount,
      };

      const postDate = startOfDay(parseISO(metadata.publishDate));
      return {
        post,
        isPublished: !metadata.draft && postDate <= currentDate,
      };
    })
  );

  const publishedPosts = [];
  const finalAllPosts = [];

  for (const item of allPosts) {
    if (item?.post) {
      finalAllPosts.push(item.post);
      if (item.isPublished) {
        publishedPosts.push(item.post);
      }
    }
  }

  const cacheDir = path.join(process.cwd(), "cache");
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
  }

  fs.writeFileSync(
    path.join(cacheDir, "all-posts.json"),
    JSON.stringify(finalAllPosts, null, 2)
  );

  fs.writeFileSync(
    path.join(cacheDir, "published-posts.json"),
    JSON.stringify(publishedPosts, null, 2)
  );

  return publishedPosts;
}
