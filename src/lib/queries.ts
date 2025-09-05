import { gql, GraphQLClient } from 'graphql-request';
import { Category, Post, PageInfo } from '@/lib/types';

// Pastikan baseUrl ada sebelum membuat client
const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not defined in .env');
}

const client = new GraphQLClient(baseUrl);

// ✅ Ambil kategori via GraphQL
// Query ini sekarang meminta semua data yang sesuai dengan tipe Category
export async function getCategories(): Promise<Category[]> {
  const query = gql`
    query getCategories {
      categories(first: 100) {
        nodes {
          id
          name
          slug
          description
          count
          parentId
        }
      }
    }
  `;

  // Tipe data yang diterima dari API cocok dengan tipe data yang diharapkan
  const data: { categories: { nodes: Category[] } } = await client.request(query);
  return data.categories.nodes;
}

// ✅ Ambil semua post (bisa filter kategori & search)
export async function getAllPosts(
  searchTerm: string = '',
  category: string = '',
  params: { before?: string | null; after?: string | null } = {}
): Promise<{
  posts: Post[],
  pageInfo: PageInfo
}> {
  const hasSearchTerm = searchTerm && searchTerm.trim() !== '';
  const hasCategoryTerm = category && category.trim() !== '';
  const isPrevious = !!params.before;

  const variableDefinitions = [
    '$perPage: Int!',
    isPrevious ? '$before: String' : '$after: String',
    hasSearchTerm ? '$search: String' : '',
    hasCategoryTerm ? '$categorySlug: String' : '',
  ].filter(Boolean).join(', ');

  const whereConditions = [
    hasSearchTerm ? 'search: $search': '',
    hasCategoryTerm ? 'categoryName: $categorySlug': ''
  ].filter(Boolean);

  const whereClause = whereConditions.length > 0
    ? `where: { ${whereConditions.join(', ')}}`
    : '';

  const query = gql`
    query GetPosts(${variableDefinitions}) {
      posts(
        ${isPrevious ? 'last: $perPage' : 'first: $perPage'},
        ${isPrevious ? 'before: $before' : 'after: $after'},
        ${whereClause}
      ) {
        nodes {
          id
          title
          excerpt
          date
          slug
          categories {
            nodes {
              name
              slug
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;

  interface Variables {
    perPage: number;
    before?: string | null;
    after?: string | null;
    search?: string;
    categorySlug?: string;
  }

  const variables: Variables = {
    perPage: 10,
    ...(isPrevious
      ? { before: params.before }
      : { after: params.after }
    )
  };

  if (hasSearchTerm) {
    variables.search = searchTerm;
  }

  if (hasCategoryTerm) {
    variables.categorySlug = category;
  }

  const data: {
    posts: {
      nodes: Post[],
      pageInfo: PageInfo
    }
  } = await client.request(query, variables);

  return {
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo
  }
}

// ✅ Ambil detail post by slug
// Query ini sekarang meminta semua data yang sesuai dengan tipe Post
export async function getPostsBySlug(slug: string): Promise<Post | null> {
  const query = gql`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        date
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  `;

  const variables = { slug };
  const data: { post: Post } = await client.request(query, variables);
  return data.post;
}