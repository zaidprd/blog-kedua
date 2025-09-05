import { LatestPosts } from '@/components/latest-posts';
import { getAllPosts, getCategories } from '@/lib/queries';
import { Post, PageInfo, Category } from '@/lib/types';
import { Categories } from '@/components/categories';

export default async function Page() {
  let posts: Post[] = [];
  let pageInfo: PageInfo | null = null;
  let categories: Category[] = [];

  try {
    const data = await getAllPosts();
    posts = data.posts;
    pageInfo = data.pageInfo;
    categories = await getCategories();
  } catch (error) {
    console.error("Failed to fetch data on home page:", error);
  }

  const latestPostProps = {
    posts,
    pageInfo,
    category: '',
    searchTerm: '',
  };

  return (
    <>
      <Categories categories={categories} />
      <LatestPosts {...latestPostProps} />
    </>
  );
}
