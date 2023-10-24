/* istanbul ignore file */
import axios from "axios";

import { Factory, Lifetime } from "@mosconautas/di";

import { AxiosHttpClient } from "../axios-http-client";
import { FetchHttpClient } from "../fetch-http-client";
import { IHttpClient } from "../http-client";

export class AxiosHttpClientFactory extends Factory {
    public static make(lifetime?: Lifetime) {
        return super.resolve({
            lifetime: lifetime ?? Lifetime.Singleton,
            make: () => new AxiosHttpClient(axios)
        });
    }
}

export class FetchHttpClientFactory extends Factory {
    public static make(lifetime?: Lifetime): IHttpClient {
        return super.resolve({
            lifetime: lifetime ?? Lifetime.Singleton,
            make: () => new FetchHttpClient(fetch)
        });
    }
}
