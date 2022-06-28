export declare type BusinessNCLink = {
    link: string;
    title: string;
};
export declare const scraper: () => Promise<(BusinessNCLink | null)[] | null>;
