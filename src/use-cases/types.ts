
export interface Bucket {
    generateUploadURL: () => Promise<{ uploadURL: string, uploadFilename: string }>;
}


export interface HttpRequest {
    body: any;
    query: any;
    params: any;
    ip?: string;
    method: string;
    path: string;
    headers: {
        'Content-Type'?: string;
        Referer?: string;
        'User-Agent'?: string;
    };
}

export interface HttpResponse {
    statusCode: number;
    headers?: Record<string, string>;
    body?: any;
}
