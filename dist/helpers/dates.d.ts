import { Article } from '../types';
export declare const filterByDays: (articles: Article[], days?: number) => Promise<Article[]>;
export declare const sortByDate: (articles: Article[]) => Article[];
export declare const convertTZ: (date: Date, tzString: string) => Date;
export declare const getEasternTime: () => Promise<Date>;
