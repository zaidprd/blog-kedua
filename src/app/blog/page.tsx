// src/app/page.tsx

import { LatestPosts } from '@/components/latest-posts';
import { getAllPosts } from '@/lib/queries';
import { Post, PageInfo } from '@/lib/types';

export default async function Page() {
  let posts: Post[] = [];
  let pageInfo: PageInfo | null = null;
  
  try {
    const data = await getAllPosts();
    posts = data.posts;
    // Ambil pageInfo dari objek data
    pageInfo = data.pageInfo;
  } catch (error) {
    console.error("Gagal mengambil artikel saat build:", error);
    // Jika pengambilan data gagal, posts dan pageInfo tetap kosong, 
    // tapi build tidak akan gagal.
  }

  const latestPostProps = {
    posts,
    pageInfo,
    category: '',
    searchTerm: '',
  };

  return (
    <section>
      <LatestPosts {...latestPostProps} />
    </section>
  );
}
