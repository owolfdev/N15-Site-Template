I'll create an admin dashboard for your blog featuring a searchable and filterable table that lists all posts. We'll use React with Next.js, and incorporate components from the shadcn/ui library for a polished look and feel.

Here's the implementation of the admin dashboard:

```typescriptreact project="Blog Admin Dashboard" file="blog-admin-dashboard.tsx"
...
```

This admin dashboard includes the following features:

1. A search input that filters posts by title or author.
2. Dropdown selects for filtering by category and tag.
3. A date range picker for filtering posts by publish date.
4. A checkbox to toggle the display of draft posts.
5. A table that displays the filtered posts with sortable columns.

The dashboard uses the shadcn/ui components for a cohesive and modern look. It's also fully responsive and should work well on both desktop and mobile devices.

To use this dashboard in your Next.js application:

1. Make sure you have all the necessary shadcn/ui components installed.
2. Replace the mock data with your actual blog post data, which you might fetch from an API or database.
3. Adjust the styling as needed to match your site's design.
4. Consider adding pagination if you have a large number of blog posts.
5. Implement any additional features you might need, such as edit or delete functionality for each post.

This dashboard provides a solid foundation for managing your blog posts, allowing you to easily search, filter, and sort your content. You can further customize it to fit your specific needs and workflow.

```javascript
"use client";

import { useState, useEffect } from "react";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for demonstration
const posts = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    type: "blog",
    title: "About",
    author: "O Wolfson",
    publishDate: "2024-01-10",
    description: "About.",
    categories: ["Web Development"],
    tags: ["mdx", "guide"],
    modifiedDate: "2024-08-23",
    image: null,
    draft: false,
    relatedPosts: [],
  },
  // Add more mock posts here...
];

export default function BlogAdminDashboard() {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showDrafts, setShowDrafts] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Extract unique categories and tags
  const categories = [...new Set(posts.flatMap((post) => post.categories))];
  const tags = [...new Set(posts.flatMap((post) => post.tags))];

  useEffect(() => {
    let result = posts;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((post) =>
        post.categories.includes(selectedCategory)
      );
    }

    // Filter by tag
    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    // Filter by draft status
    if (!showDrafts) {
      result = result.filter((post) => !post.draft);
    }

    // Filter by date range
    if (dateRange.from && dateRange.to) {
      result = result.filter((post) => {
        const postDate = new Date(post.publishDate);
        return postDate >= dateRange.from && postDate <= dateRange.to;
      });
    }

    // Sort the results
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    setFilteredPosts(result);
  }, [
    searchTerm,
    selectedCategory,
    selectedTag,
    showDrafts,
    dateRange,
    sortConfig,
  ]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Admin Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Tags</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[280px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="show-drafts"
            checked={showDrafts}
            onCheckedChange={setShowDrafts}
          />
          <label
            htmlFor="show-drafts"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Drafts
          </label>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost" onClick={() => handleSort("id")}>
                ID
                {sortConfig.key === "id" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUpIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("title")}>
                Title
                {sortConfig.key === "title" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUpIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("author")}>
                Author
                {sortConfig.key === "author" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUpIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("publishDate")}>
                Publish Date
                {sortConfig.key === "publishDate" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUpIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Draft</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">
                {post.id.slice(0, 8)}...
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.publishDate}</TableCell>
              <TableCell>{post.categories.join(", ")}</TableCell>
              <TableCell>{post.tags.join(", ")}</TableCell>
              <TableCell>{post.draft ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```
