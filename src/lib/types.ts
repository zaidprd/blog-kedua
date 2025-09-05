export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null; // Tambahkan `| null`
  endCursor: string | null;   // Tambahkan `| null`
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
  categories: {
    nodes: Category[];
  }
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