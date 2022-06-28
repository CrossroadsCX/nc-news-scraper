export declare const newsScraper: () => Promise<{
    businessNCLinks: (import("../siteScrapers/businessNC.js").BusinessNCLink | null)[] | null;
    carolinaJournalLinks: {
        category: any;
        description: any;
        link: any;
        title: any;
    }[] | null;
    triangleBusinessJournalLinks: import("../siteScrapers/triangleBusinessJournal.js").TriangleBusinessJournalLink[] | null;
    newsAndObserverLinks: (import("../siteScrapers/newsAndObserver.js").NewsAndObserverLink | null)[] | null;
}>;
