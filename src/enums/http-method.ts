export enum HttpMethod {
  /** @description Represents an HTTP PUT protocol method that is used to replace an entity identified by a URI. */
  Put = "PUT",
  /**
   * @description Represents an HTTP POST protocol method that is used to post a new entity as
   * an addition to a URI.
   */
  Post = "POST",
  /** @description Gets the HTTP PATCH protocol method. */
  Patch = "PATCH",
  /** @description Represents an HTTP OPTIONS protocol method. */
  Options = "OPTIONS",
  /**
   * @description Represents an HTTP HEAD protocol method. The HEAD method is identical to GET
   * except that the server only returns message-headers in the response, without
   * a message-body.
   */
  Head = "HEAD",
  /** @description Represents an HTTP TRACE protocol method. */
  Trace = "TRACE",
  /** @description Represents an HTTP GET protocol method. */
  Get = "GET",
  /** @description Represents an HTTP DELETE protocol method. */
  Delete = "DELETE",
  /** @description Gets the HTTP CONNECT protocol method. */
  Connect = "CONNECT",
}
