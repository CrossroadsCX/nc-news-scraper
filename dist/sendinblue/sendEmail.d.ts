import SIBApi from '@sendinblue/client';
import type { ArticleList } from '../types';
export declare const sendEmail: (articles: ArticleList) => Promise<{
    body: SIBApi.CreateSmtpEmail;
    statusCode: number | undefined;
} | {
    body: unknown;
    statusCode: number;
}>;
