export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

export type Post = {
  id: string; // Atau 'number', sesuaikan dengan data API
  title: string;
  slug: string;
  date: string;
  content: string;
  author: {
    node: {
      name: string;
    }
  }
  // ✅ Perbaikan: nodes adalah array dari objek Category
  categories: {
    nodes: Category[];
  }
  // ✅ Perbaikan: nodes adalah array dari objek yang punya properti name
  tags: {
    nodes: {
      name: string;
    }[];
  }
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};