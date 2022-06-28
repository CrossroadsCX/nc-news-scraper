export declare const newsScraper: () => Promise<{
    businessNCLinks: (import("../siteScrapers/businessNC.js").BusinessNCLink | null)[] | null;
    carolinaJournalLinks: {
        category: any;
        description: any;
        link: any;
        title: any;
    }[] | null;
    ncPolicyWatchLinks: {
        title: string;
        link: string;
    }[] | null;
    newsAndObserverLinks: (import("../siteScrapers/newsAndObserver.js").NewsAndObserverLink | null)[] | null;
    triangleBusinessJournalLinks: import("../siteScrapers/triangleBusinessJournal.js").TriangleBusinessJournalLink[] | null;
}>;
