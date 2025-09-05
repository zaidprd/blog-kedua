// src/components/latest-posts.tsx

import { SearchBar } from "@/components/search-bar";
import { Post, PageInfo } from '@/lib/types'; // Import PageInfo dari types.ts
import Link from "next/link";

// Definisikan tipe props dengan lebih jelas
type LatestPostsProps = {
  posts: Post[];
  title?: string;
  searchTerm?: string;
  // Gunakan tipe PageInfo yang sudah diperbaiki
  pageInfo: PageInfo | null;
  category?: string;
}

export function LatestPosts({ posts, searchTerm, pageInfo, category }: LatestPostsProps) {

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <h2 className="text-xl mb-4">Latest Posts</h2>
        <div>
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-col mb-4">
        {posts.map((post: Post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="border-b py-4 flex justify-between hover:bg-slate-50"
          >
            <div dangerouslySetInnerHTML={{ __html: post.title }}></div>
            <p>{new Date(post.date).toLocaleDateString("de-De")}</p>
          </Link>
        ))}
      </div>

      {/* Navigasi Halaman */}
      <div className="flex justify-between">
        {/* Tombol Previous */}
        <div>
          {pageInfo?.hasPreviousPage && (
            <Link
              href={{
                pathname: '/blog',
                query: {
                  before: pageInfo.startCursor,
                  ...(searchTerm && { searchTerm }),
                  ...(category && { category })
                }
              }}
            >
              Previous
            </Link>
          )}
        </div>

        {/* Tombol Next */}
        <div>
          {pageInfo?.hasNextPage && (
            <Link
              href={{
                pathname: '/blog',
                query: {
                  after: pageInfo.endCursor,
                  ...(searchTerm && { searchTerm }),
                  ...(category && { category })
                }
              }}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}