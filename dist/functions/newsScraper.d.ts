export declare const newsScraper: () => Promise<{
    carolinaJournalLinks: {
        category: any;
        description: any;
        link: any;
        title: any;
    }[] | null;
    newsAndObserverLinks: (import("../siteScrapers/newsAndObserver.js").NewsAndObserverLink | null)[] | null;
}>;
