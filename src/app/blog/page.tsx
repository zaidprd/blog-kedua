import { LatestPosts } from '@/components/latest-posts';
import { getAllPosts } from '@/lib/queries';
import { Post, PageInfo } from '@/lib/types'; // Import tipe dari satu sumber

export default async function Page() {
  let posts: Post[] = [];
  let pageInfo: PageInfo | null = null;
  
  try {
    const data = await getAllPosts();
    posts = data.posts;
    pageInfo = data.pageInfo;
  } catch (error) {
    console.error("Gagal mengambil artikel saat build:", error);
    // Data tetap kosong, tetapi build akan berhasil
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