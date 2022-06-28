export declare type TriangleBusinessJournalLink = {
    link: string;
    title: string;
};
export declare const scraper: () => Promise<TriangleBusinessJournalLink[] | null>;
