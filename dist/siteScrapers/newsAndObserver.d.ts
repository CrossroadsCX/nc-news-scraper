export declare type NewsAndObserverLink = {
    id: string;
    title: string;
    link: string;
    tag: string;
    dateText: string;
    dateTime: string;
};
export declare const scraper: () => Promise<(NewsAndObserverLink | null)[] | null>;
