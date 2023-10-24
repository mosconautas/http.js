/* istanbul ignore file */
import axios from "axios";
import { AxiosHttpClientAdapter, FetchHttpClientAdapter } from "./adapters";
import { IHttpClient } from "./http-client";

export class HttpClientFactory {
    private static _instances: Map<string, IHttpClient> = new Map();

    private constructor() {}

    public static url(url: string, baseUrl?: string): URL {
        return new URL(url, baseUrl);
    }

    public static fetch(): IHttpClient {
        if (!this._instances.has(FetchHttpClientAdapter.name)) {
            this._instances.set(FetchHttpClientAdapter.name, new FetchHttpClientAdapter(fetch));
        }

        return this._instances.get(FetchHttpClientAdapter.name)!;
    }

    public static axios(): IHttpClient {
        if (!this._instances.has(AxiosHttpClientAdapter.name)) {
            this._instances.set(AxiosHttpClientAdapter.name, new AxiosHttpClientAdapter(axios));
        }

        return this._instances.get(AxiosHttpClientAdapter.name)!;
    }
}
