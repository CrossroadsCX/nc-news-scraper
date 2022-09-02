export type Article = {
  title: string;
  link: string;
  description?: string;
  category?: string;
  tag?: string;
  dateText?: string;
  dateTime: string;
  id?: string;
}

export type ArticleList = {
  businessNCLinks: Article[];
  carolinaJournalLinks: Article[];
  newsAndObserverLinks: Article[];
  ncPolicyWatchLinks: Article[];
  triangleBusinessJournalLinks: Article[];
}
