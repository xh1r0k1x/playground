export type NewsItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  host: string;
  image?: string;
};

export type NewsCache = {
  news: NewsItem[];
  generatedArticles: string[];
};
