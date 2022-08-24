/// <reference types="node" />
import type { ArticleList } from '../types';
export declare const createCampaign: (articles: ArticleList) => Promise<{
    response: import("http").IncomingMessage;
    body?: any;
}>;
