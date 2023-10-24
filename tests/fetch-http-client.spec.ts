import {
    FetchHttpClientAdapter,
    HttpBadRequest,
    HttpForbidden,
    HttpMethod,
    HttpNotFound,
    HttpServerError,
    HttpStatusCode,
    HttpUnauthorized,
} from "../src";

describe(FetchHttpClientAdapter.name, () => {
    let url: URL;
    let fetchSpy: jest.Mock<(typeof fetch)["prototype"]>;
    let sut: FetchHttpClientAdapter;

    beforeEach(() => {
        url = new URL("http://any_url");
        fetchSpy = jest.fn();

        sut = new FetchHttpClientAdapter(fetchSpy);
    });

    beforeEach(() => {
        fetchSpy.mockReset();
    });

    describe("shared", () => {
        it("Should always send `Content-Type` and `Accept` headers for all requests", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Ok }));

            await sut.request({ url: url, method: HttpMethod.Get });

            expect(fetchSpy).toHaveBeenCalledWith(url.toString(), {
                method: HttpMethod.Get,
                body: null,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
        });

        it("Should return a `Headers` with the headers in all successful requests by `HttpClient`", async () => {
            fetchSpy.mockResolvedValue(
                new Response(null, {
                    status: HttpStatusCode.Ok,
                    headers: new Headers({
                        any_header: "any_value",
                        any_header_2: "any_value_2",
                    }),
                })
            );

            const response = await sut.request({ url: url, method: HttpMethod.Get });

            expect(response.headers).toEqual(
                new Headers({
                    any_header: "any_value",
                    any_header_2: "any_value_2",
                })
            );
        });
    });

    describe(HttpMethod.Get, () => {
        it("Should call `fetch` with correct values", () => {
            const bodyMock = { any: "any" };
            const headersMock = { any: "any" };

            fetchSpy.mockResolvedValue(
                new Response(JSON.stringify(bodyMock), {
                    status: HttpStatusCode.Ok,
                    headers: {
                        "content-type": "application/json",
                    },
                })
            );

            sut.request({ url: url, method: HttpMethod.Get, body: bodyMock, headers: headersMock });

            expect(fetchSpy).toHaveBeenCalledWith(url.toString(), {
                method: HttpMethod.Get,
                body: null,
                headers: {
                    any: "any",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
        });

        it("Should return `null` if `get` returns a 204 status code", async () => {
            fetchSpy.mockResolvedValue(
                new Response(null, {
                    status: HttpStatusCode.NoContent,
                })
            );

            const response = await sut.request({ url: url, method: HttpMethod.Get });

            expect(response.body).toBeNull();
            expect(response.statusCode).toBe(HttpStatusCode.NoContent);
        });

        it("Should throw a `HttpBadRequest` if `get` returns a 400 status code", async () => {
            fetchSpy.mockResolvedValue(
                new Response(null, {
                    status: HttpStatusCode.BadRequest,
                })
            );

            const promise = sut.request({ url: url, method: HttpMethod.Get });

            await expect(promise).rejects.toThrow(new HttpBadRequest(null));
        });

        it("Should throw a `HttpBadRequest` if `get` returns a 400 status code with body", async () => {
            fetchSpy.mockResolvedValue(
                new Response("any_message_error", {
                    status: HttpStatusCode.BadRequest,
                })
            );

            const promise = sut.request({ url: url, method: HttpMethod.Get });

            await expect(promise).rejects.toThrow(new HttpBadRequest("any_message_error"));
        });

        it("Should throw a `HttpUnauthorized` if `get` returns a 401 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Unauthorized }));

            const promise = sut.request({ url: url, method: HttpMethod.Get });

            await expect(promise).rejects.toThrow(HttpUnauthorized);
        });

        it("Should throw a `HttpForbidden` if `get` returns a 403 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Forbidden }));

            const promise = sut.request({ url: url, method: HttpMethod.Get });

            await expect(promise).rejects.toThrow(HttpForbidden);
        });

        it("Should throw a `HttpNotFound` if `get` returns a 404 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.NotFound }));

            const promise = sut.request({ url: url, method: HttpMethod.Get });

            await expect(promise).rejects.toThrow(HttpNotFound);
        });

        it("Should throw a `HttpServerError` if `get` returns a 500 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.InternalServerError }));

            const promise = sut.request({ url: url, method: HttpMethod.Get });

            await expect(promise).rejects.toThrow(HttpServerError);
        });

        it("Should throw a `HttpServerError` if `get` throws any unhandled error", async () => {
            fetchSpy.mockRejectedValue(new Error("any_error"));

            const promise = sut.request({ url: url, method: HttpMethod.Get });

            await expect(promise).rejects.toThrow(HttpServerError);
        });
    });

    describe(HttpMethod.Post, () => {
        it("Should call `fetch` with correct values", () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Ok }));

            const bodyMock = { any: "any" };
            const headersMock = { any: "any" };

            sut.request({ url: url, method: HttpMethod.Post, body: bodyMock, headers: headersMock });

            expect(fetchSpy).toHaveBeenCalledWith(url.toString(), {
                body: JSON.stringify(bodyMock),
                method: HttpMethod.Post,
                headers: {
                    any: "any",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
        });

        it("Should return `null` if `post` returns a 204 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.NoContent }));

            const response = await sut.request({ url: url, method: HttpMethod.Post });

            expect(response.body).toBeNull();
            expect(response.statusCode).toBe(204);
        });

        it("Should throw a `HttpBadRequest` if `post` returns a 400 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.BadRequest }));

            const promise = sut.request({ url: url, method: HttpMethod.Post });

            await expect(promise).rejects.toThrow(new HttpBadRequest(null));
        });

        it("Should throw a `HttpBadRequest` if `post` returns a 400 status code with body", async () => {
            fetchSpy.mockResolvedValue(new Response("any_message_error", { status: HttpStatusCode.BadRequest }));

            const promise = sut.request({ url: url, method: HttpMethod.Post });

            await expect(promise).rejects.toThrow(new HttpBadRequest("any_message_error"));
        });

        it("Should throw a `HttpUnauthorized` if `post` returns a 401 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Unauthorized }));

            const promise = sut.request({ url: url, method: HttpMethod.Post });

            await expect(promise).rejects.toThrow(HttpUnauthorized);
        });

        it("Should throw a `HttpForbidden` if `post` returns a 403 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Forbidden }));

            const promise = sut.request({ url: url, method: HttpMethod.Post });

            await expect(promise).rejects.toThrow(HttpForbidden);
        });

        it("Should throw a `HttpNotFound` if `post` returns a 404 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.NotFound }));

            const promise = sut.request({ url: url, method: HttpMethod.Post });

            await expect(promise).rejects.toThrow(HttpNotFound);
        });

        it("Should throw a `HttpServerError` if `post` returns a 500 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.InternalServerError }));

            const promise = sut.request({ url: url, method: HttpMethod.Post });

            await expect(promise).rejects.toThrow(HttpServerError);
        });

        it("Should throw a `HttpServerError` if `post` throws any unhandled error", async () => {
            fetchSpy.mockRejectedValue(new Error("any_error"));

            const promise = sut.request({ url: url, method: HttpMethod.Post });

            await expect(promise).rejects.toThrow(HttpServerError);
        });
    });

    describe("patch", () => {
        it("Should call `fetch` with correct values", () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Ok }));

            const bodyMock = { any: "any" };
            const headersMock = { any: "any" };

            sut.request({ url: url, method: HttpMethod.Patch, body: bodyMock, headers: headersMock });

            expect(fetchSpy).toHaveBeenCalledWith(url.toString(), {
                body: JSON.stringify(bodyMock),
                method: HttpMethod.Patch,
                headers: {
                    any: "any",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
        });

        it("Should return `null` if `patch` returns a 204 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.NoContent }));

            const response = await sut.request({ url: url, method: HttpMethod.Patch });

            expect(response.body).toBeNull();
            expect(response.statusCode).toBe(204);
        });

        it("Should throw a `HttpBadRequest` if `patch` returns a 400 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.BadRequest }));

            const promise = sut.request({ url: url, method: HttpMethod.Patch });

            await expect(promise).rejects.toThrow(new HttpBadRequest(null));
        });

        it("Should throw a `HttpBadRequest` if `patch` returns a 400 status code with body", async () => {
            fetchSpy.mockResolvedValue(new Response("any_message_error", { status: HttpStatusCode.BadRequest }));

            const promise = sut.request({ url: url, method: HttpMethod.Patch });

            await expect(promise).rejects.toThrow(new HttpBadRequest("any_message_error"));
        });

        it("Should throw a `HttpUnauthorized` if `patch` returns a 401 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Unauthorized }));

            const promise = sut.request({ url: url, method: HttpMethod.Patch });

            await expect(promise).rejects.toThrow(HttpUnauthorized);
        });

        it("Should throw a `HttpForbidden` if `patch` returns a 403 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Forbidden }));

            const promise = sut.request({ url: url, method: HttpMethod.Patch });

            await expect(promise).rejects.toThrow(HttpForbidden);
        });

        it("Should throw a `HttpNotFound` if `patch` returns a 404 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.NotFound }));

            const promise = sut.request({ url: url, method: HttpMethod.Patch });

            await expect(promise).rejects.toThrow(HttpNotFound);
        });

        it("Should throw a `HttpServerError` if `patch` returns a 500 status code", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.InternalServerError }));

            const promise = sut.request({ url: url, method: HttpMethod.Patch });

            await expect(promise).rejects.toThrow(HttpServerError);
        });

        it("Should throw a `HttpServerError` if `patch` throws any unhandled error", async () => {
            fetchSpy.mockRejectedValue(new Error("any_error"));

            const promise = sut.request({ url: url, method: HttpMethod.Patch });

            await expect(promise).rejects.toThrow(HttpServerError);
        });
    });

    describe(HttpMethod.Delete, () => {
        it("Should call `request` with correct values", () => {
            const bodyMock = { any: "any" };
            const headersMock = { any: "any" };

            fetchSpy.mockResolvedValue(new Response(JSON.stringify(bodyMock), { status: HttpStatusCode.Ok }));

            sut.request({ url: url, method: HttpMethod.Delete, body: bodyMock, headers: headersMock });

            expect(fetchSpy).toHaveBeenCalledWith(url.toString(), {
                body: JSON.stringify(bodyMock),
                method: HttpMethod.Delete,
                headers: {
                    any: "any",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
        });

        it("Should return `null` if `delete` returns status code 204", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.NoContent }));

            const response = await sut.request({ url: url, method: HttpMethod.Delete });

            expect(response.body).toBeNull();
            expect(response.statusCode).toBe(204);
        });

        it("Should throw `HttpBadRequest` if `delete` throws a status code 400", async () => {
            fetchSpy.mockResolvedValue(
                new Response(null, {
                    status: HttpStatusCode.BadRequest,
                })
            );

            const promise = sut.request({ url: url, method: HttpMethod.Delete });

            await expect(promise).rejects.toThrow(new HttpBadRequest(null));
        });

        it("Should throw `HttpBadRequest` if `delete` throws a status code 400 with body", async () => {
            fetchSpy.mockResolvedValue(
                new Response("any_message_error", {
                    status: HttpStatusCode.BadRequest,
                })
            );

            const promise = sut.request({ url: url, method: HttpMethod.Delete });

            await expect(promise).rejects.toThrow(new HttpBadRequest("any_message_error"));
        });

        it("Should throw `HttpUnauthorized` if `delete` throws a status code 401", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Unauthorized }));

            const promise = sut.request({ url: url, method: HttpMethod.Delete });

            await expect(promise).rejects.toThrow(HttpUnauthorized);
        });

        it("Should throw `HttpForbidden` if `delete` throws a status code 403", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.Forbidden }));

            const promise = sut.request({ url: url, method: HttpMethod.Delete });

            await expect(promise).rejects.toThrow(HttpForbidden);
        });

        it("Should throw `HttpNotFound` if `delete` throws a status code 404", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.NotFound }));

            const promise = sut.request({ url: url, method: HttpMethod.Delete });

            await expect(promise).rejects.toThrow(HttpNotFound);
        });

        it("Should throw `InternalServerError` if `delete` throws a status code 500", async () => {
            fetchSpy.mockResolvedValue(new Response(null, { status: HttpStatusCode.InternalServerError }));

            const promise = sut.request({ url: url, method: HttpMethod.Delete });

            await expect(promise).rejects.toThrow(HttpServerError);
        });

        it("Should throw `ServerError` if `delete` throws any unhandled error", async () => {
            fetchSpy.mockRejectedValue(new Error("any_error"));

            const promise = sut.request({ url: url, method: HttpMethod.Delete });

            await expect(promise).rejects.toThrow(HttpServerError);
        });
    });
});
