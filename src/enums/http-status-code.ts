export enum HttpStatusCode {
    NoConnection = 0,

    /** 
     * @description RFC 7231, 6.2.1
     * @link https://tools.ietf.org/html/rfc7231#section-6.2.1
     */
    Continue = 100,

    /** 
     * @description RFC 7231, 6.2.2
     * @link https://tools.ietf.org/html/rfc7231#section-6.2.2
     */
    SwitchingProtocols = 101,

    /** 
     * @description RFC 2518, 10.1
     * @link https://tools.ietf.org/html/rfc2518#section-10.1
     */
    Processing = 102,

    /** 
     * @description RFC 8297
     * @link https://tools.ietf.org/html/rfc8297
     */
    EarlyHints = 103,

    /** 
     * @description RFC 7231, 6.3.1
     * @link https://tools.ietf.org/html/rfc7231#section-6.3.1
     */
    Ok = 200,

    /** 
     * @description RFC 7231, 6.3.2
     * @link https://tools.ietf.org/html/rfc7231#section-6.3.2
     */
    Created = 201,

    /** 
     * @description RFC 7231, 6.3.3
     * @link https://tools.ietf.org/html/rfc7231#section-6.3.3
     */
    Accepted = 202,

    /** 
     * @description RFC 7231, 6.3.4
     * @link https://tools.ietf.org/html/rfc7231#section-6.3.4
     */
    NonAuthoritativeInfo = 203,

    /** 
     * @description RFC 7231, 6.3.5
     * @link https://tools.ietf.org/html/rfc7231#section-6.3.5
     */
    NoContent = 204,

    /** 
     * @description RFC 7231, 6.3.6
     * @link https://tools.ietf.org/html/rfc7231#section-6.3.6
     */
    ResetContent = 205,

    /** 
     * @description RFC 7233, 4.1
     * @link https://tools.ietf.org/html/rfc7233#section-4.1
     */
    PartialContent = 206,

    /** 
     * @description RFC 4918, 11.1
     * @link https://tools.ietf.org/html/rfc4918#section-11.1
     */
    MultiStatus = 207,

    /** 
     * @description RFC 5842, 7.1
     * @link https://tools.ietf.org/html/rfc5842#section-7.1
     */
    AlreadyReported = 208,

    /** 
     * @description RFC 3229, 10.4.1
     * @link https://tools.ietf.org/html/rfc3229#section-10.4.1
     */
    IMUsed = 226,

    /** 
     * @description RFC 7231, 6.4.1
     * @link https://tools.ietf.org/html/rfc7231#section-6.4.1
     */
    MultipleChoices = 300,

    /** 
     * @description RFC 7231, 6.4.2
     * @link https://tools.ietf.org/html/rfc7231#section-6.4.2
     */
    MovedPermanently = 301,

    /** 
     * @description RFC 7231, 6.4.3
     * @link https://tools.ietf.org/html/rfc7231#section-6.4.3
     */
    Found = 302,

    /** 
     * @description RFC 7231, 6.4.4
     * @link https://tools.ietf.org/html/rfc7231#section-6.4.4
     */
    SeeOther = 303,

    /** 
     * @description RFC 7232, 4.1
     * @link https://tools.ietf.org/html/rfc7232#section-4.1
     */
    NotModified = 304,

    /** 
     * @description RFC 7231, 6.4.5
     * @link https://tools.ietf.org/html/rfc7231#section-6.4.5
     */
    UseProxy = 305,

    /** 
     * @description RFC 7231, 6.4.6 (Unused)
     * @link https://tools.ietf.org/html/rfc7231#section-6.4.6
     */
    _ = 306,

    /** 
     * @description RFC 7231, 6.4.7
     * @link https://tools.ietf.org/html/rfc7231#section-6.4.7
     */
    TemporaryRedirect = 307,

    /** 
     * @description RFC 7538, 3
     * @link https://tools.ietf.org/html/rfc7538#section-3
     */
    PermanentRedirect = 308,

    /** 
     * @description RFC 7231, 6.5.1
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.1
     */
    BadRequest = 400,

    /** 
     * @description RFC 7235, 3.1
     * @link https://tools.ietf.org/html/rfc7235#section-3.1
     */
    Unauthorized = 401,

    /** 
     * @description RFC 7231, 6.5.2
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.2
     */
    PaymentRequired = 402,

    /** 
     * @description RFC 7231, 6.5.3
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.3
     */
    Forbidden = 403,

    /** 
     * @description RFC 7231, 6.5.4
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.4
     */
    NotFound = 404,

    /** 
     * @description RFC 7231, 6.5.5
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.5
     */
    MethodNotAllowed = 405,

    /** 
     * @description RFC 7231, 6.5.6
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.6
     */
    NotAcceptable = 406,

    /** 
     * @description RFC 7235, 3.2
     * @link https://tools.ietf.org/html/rfc7235#section-3.2
     */
    ProxyAuthRequired = 407,

    /** 
     * @description RFC 7231, 6.5.7
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.7
     */
    RequestTimeout = 408,

    /** 
     * @description RFC 7231, 6.5.8
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.8
     */
    Conflict = 409,

    /** 
     * @description RFC 7231, 6.5.9
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.9
     */
    Gone = 410,

    /** 
     * @description RFC 7231, 6.5.10
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.10
     */
    LengthRequired = 411,

    /** 
     * @description RFC 7232, 4.2
     * @link https://tools.ietf.org/html/rfc7232#section-4.2
     */
    PreconditionFailed = 412,

    /** 
     * @description RFC 7231, 6.5.11
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.11
     */
    RequestEntityTooLarge = 413,

    /** 
     * @description RFC 7231, 6.5.12
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.12
     */
    RequestURITooLong = 414,

    /** 
     * @description RFC 7231, 6.5.13
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.13
     */
    UnsupportedMediaType = 415,

    /** 
     * @description RFC 7233, 4.4
     * @link https://tools.ietf.org/html/rfc7233#section-4.4
     */
    RequestedRangeNotSatisfiable = 416,

    /** 
     * @description RFC 7231, 6.5.14
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.14
     */
    ExpectationFailed = 417,

    /** 
     * @description RFC 7168, 2.3.3
     * @link https://tools.ietf.org/html/rfc7168#section-2.3.3
     */
    Teapot = 418,

    /** 
     * @description RFC 7540, 9.1.2
     * @link https://tools.ietf.org/html/rfc7540#section-9.1.2
     */
    MisdirectedRequest = 421,

    /** 
     * @description RFC 4918, 11.2
     * @link https://tools.ietf.org/html/rfc4918#section-11.2
     */
    UnprocessableEntity = 422,

    /** 
     * @description RFC 4918, 11.3
     * @link https://tools.ietf.org/html/rfc4918#section-11.3
     */
    Locked = 423,

    /** 
     * @description RFC 4918, 11.4
     * @link https://tools.ietf.org/html/rfc4918#section-11.4
     */
    FailedDependency = 424,

    /** 
     * @description RFC 8470, 5.2.
     * @link https://tools.ietf.org/html/rfc8470#section-5.2
     */
    TooEarly = 425,

    /** 
     * @description RFC 7231, 6.5.15
     * @link https://tools.ietf.org/html/rfc7231#section-6.5.15
     */
    UpgradeRequired = 426,

    /** 
     * @description RFC 6585, 3
     * @link https://tools.ietf.org/html/rfc6585#section-3
     */
    PreconditionRequired = 428,

    /** 
     * @description RFC 6585, 4
     * @link https://tools.ietf.org/html/rfc6585#section-4
     */
    TooManyRequests = 429,

    /** 
     * @description RFC 6585, 5
     * @link https://tools.ietf.org/html/rfc6585#section-5
     */
    RequestHeaderFieldsTooLarge = 431,

    /** 
     * @description RFC 7725, 3
     * @link https://tools.ietf.org/html/rfc7725#section-3
     */
    UnavailableForLegalReasons = 451,

    /** 
     * @description RFC 7231, 6.6.1
     * @link https://tools.ietf.org/html/rfc7231#section-6.6.1
     */
    InternalServerError = 500,

    /** 
     * @description RFC 7231, 6.6.2
     * @link https://tools.ietf.org/html/rfc7231#section-6.6.2
     */
    NotImplemented = 501,

    /** 
     * @description RFC 7231, 6.6.3
     * @link https://tools.ietf.org/html/rfc7231#section-6.6.3
     */
    BadGateway = 502,

    /** 
     * @description RFC 7231, 6.6.4
     * @link https://tools.ietf.org/html/rfc7231#section-6.6.4
     */
    ServiceUnavailable = 503,

    /** 
     * @description RFC 7231, 6.6.5
     * @link https://tools.ietf.org/html/rfc7231#section-6.6.5
     */
    GatewayTimeout = 504,

    /** 
     * @description RFC 7231, 6.6.6
     * @link https://tools.ietf.org/html/rfc7231#section-6.6.6
     */
    HTTPVersionNotSupported = 505,

    /** 
     * @description RFC 2295, 8.1
     * @link https://tools.ietf.org/html/rfc2295#section-8.1
     */
    VariantAlsoNegotiates = 506,

    /** 
     * @description RFC 4918, 11.5
     * @link https://tools.ietf.org/html/rfc4918#section-11.5
     */
    InsufficientStorage = 507,

    /** 
     * @description RFC 5842, 7.2
     * @link https://tools.ietf.org/html/rfc5842#section-7.2
     */
    LoopDetected = 508,

    /** 
     * @description RFC 2774, 7
     * @link https://tools.ietf.org/html/rfc2774#section-7
     */
    Notmergeed = 510,

    /** 
     * @description RFC 6585, 6
     * @link https://tools.ietf.org/html/rfc6585#section-6
     */
    NetworkAuthenticationRequired = 511,
}
