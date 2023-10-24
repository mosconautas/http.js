import { HttpMethod, HttpStatusCode } from "./enums";

export interface IHttpClient {
    request<T = any>(request: IHttpClient.Request): Promise<IHttpClient.Response<T>>;
}

export namespace IHttpClient {
    export interface Request {
        url: URL | string;
        method: HttpMethod;
        body?: any;
        headers?: Record<string, string>;
    }

    export interface Response<T = any> {
        body: T | null;
        headers: Headers;
        statusCode: HttpStatusCode;
    }
}
