export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  author: {
    node: {
      name: string;
    }
  };
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  categories: {
    nodes: Category[];
  };
  tags: {
    nodes: {
      name: string;
    }[];
  };
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  count: number;
  parentId: string | null;
};
