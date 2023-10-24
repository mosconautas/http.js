import { Axios, AxiosError } from "axios";
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

export class AxiosHttpClientAdapter implements IHttpClient {
    constructor(private readonly _axios: Axios) {}

    public async request<T = any>({ url, method, ...options }: IHttpClient.Request): Promise<IHttpClient.Response<T>> {
        const headers = Object.assign(
            { Accept: "application/json", "Content-Type": "application/json" },
            options.headers
        );

        try {
            const response = await this._axios.request({
                url: url.toString(),
                method: method,
                data: method == HttpMethod.Get ? null : JSON.stringify(options.body),
                headers: headers,
            });

            return {
                body: response.data,
                headers: response.headers as any,
                statusCode: response.status,
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }

            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 400:
                        throw new HttpBadRequest(error.response.data);
                    case 401:
                        throw new HttpUnauthorized();
                    case 403:
                        throw new HttpForbidden();
                    case 404:
                        throw new HttpNotFound(error.response.config.url ?? url.toString());
                    case 500:
                    default:
                        throw new HttpServerError();
                }
            }

            throw new HttpServerError();
        }
    }
}
