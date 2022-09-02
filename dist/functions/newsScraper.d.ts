/// <reference types="node" />
export declare const newsScraper: () => Promise<{
    response: import("http").IncomingMessage;
    body?: any;
} | {
    businessNCLinks: import("../types.js").Article[];
    carolinaJournalLinks: import("../types.js").Article[];
    ncPolicyWatchLinks: import("../types.js").Article[];
    newsAndObserverLinks: import("../types.js").Article[];
    politicsNCLinks: import("../types.js").Article[];
    triangleBusinessJournalLinks: import("../types.js").Article[];
}>;
