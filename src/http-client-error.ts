import { HttpStatusCode } from "./enums";

export class HttpError extends Error {
    constructor(public readonly statusCode: HttpStatusCode, message: string) {
        super(message);
    }

    public toJSON(): Record<string, any> {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
        };
    }
}

export class HttpBadRequest extends HttpError {
    constructor(public readonly body?: any | null) {
        super(HttpStatusCode.BadRequest, `Bad Request: "${JSON.stringify(body)}"`);
    }
}

export class HttpForbidden extends HttpError {
    constructor(message?: string) {
        super(HttpStatusCode.Forbidden, message ?? "The request was forbidden.");
    }
}

export class HttpNotFound extends HttpError {
    constructor(public readonly url: URL | string) {
        super(HttpStatusCode.NotFound, `The requested resource was not found at ${url}`);
    }

    public toJSON(): Record<string, any> {
        return Object.assign(super.toJSON(), {
            url: this.url,
        });
    }
}

export class HttpServerError extends HttpError {
    constructor(message?: string) {
        super(HttpStatusCode.InternalServerError, message ?? "An unexpected server error occurred.");
    }
}

export class HttpUnauthorized extends HttpError {
    constructor(message?: string) {
        super(HttpStatusCode.Unauthorized, message ?? "The request was not authorized.");
    }
}
