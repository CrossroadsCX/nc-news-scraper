export declare const newsScraper: () => Promise<{
    body: import("@sendinblue/client").CreateSmtpEmail;
    statusCode: number | undefined;
} | {
    body: unknown;
    statusCode: number;
}>;
