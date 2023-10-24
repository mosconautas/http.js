import { HttpMethod } from "../enums";
import { IHttpClient } from "../http-client";
import {
    HttpBadRequest,
    HttpError,
    HttpForbidden,
    HttpNotFound,
    HttpServerError,
    HttpUnauthorized,
} from "../http-client-error";

export class FetchHttpClientAdapter implements IHttpClient {
    constructor(private readonly _fetch: typeof fetch) {}

    public async request<T = any>({ url, method, ...options }: IHttpClient.Request): Promise<IHttpClient.Response<T>> {
        const headers = Object.assign(
            { Accept: "application/json", "Content-Type": "application/json" },
            options.headers
        );

        try {
            return await this._fetch(url.toString(), {
                method: method,
                body: method == HttpMethod.Get ? null : JSON.stringify(options.body),
                headers: headers,
            }).then(this._handleResponse.bind(this));
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }

            throw new HttpServerError();
        }
    }

    private async _handleResponse<T = any>(httpResponse: Response): Promise<IHttpClient.Response<T>> {
        const body = await this._handleBody(httpResponse);

        if (httpResponse.ok) {
            return {
                body: httpResponse.status === 204 ? null : body,
                statusCode: httpResponse.status,
                headers: httpResponse.headers,
            };
        }

        switch (httpResponse.status) {
            case 400:
                throw new HttpBadRequest(body);
            case 401:
                throw new HttpUnauthorized();
            case 403:
                throw new HttpForbidden();
            case 404:
                throw new HttpNotFound(httpResponse.url);
            case 500:
            default:
                throw new HttpServerError();
        }
    }

    private async _handleBody(httpResponse: Response) {
        if (!httpResponse.body) {
            return null;
        }

        if (httpResponse.headers.get("content-type")?.includes("application/json")) {
            return await httpResponse.json();
        }

        return await httpResponse.text();
    }
}
