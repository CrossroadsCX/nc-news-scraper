import type { Article } from '../types';
export declare type BusinessNCLink = {
    link: string;
    title: string;
};
export declare const scraper: () => Promise<Article[]>;
