export declare type Article = {
    title: string;
    link: string;
    description?: string;
    category?: string;
    tag?: string;
    dateText?: string;
    dateTime: string | null;
    id?: string;
};
export declare type ArticleList = {
    businessNCLinks: Article[];
    carolinaJournalLinks: Article[];
    newsAndObserverLinks: Article[];
    ncPolicyWatchLinks: Article[];
    triangleBusinessJournalLinks: Article[];
};
