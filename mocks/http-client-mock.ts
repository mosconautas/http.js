import { IHttpClient } from "../src";

export class HttpClientMock implements IHttpClient {
    public request = jest.fn();

    public mockRequest(response: Partial<IHttpClient.Response<any>>) {
        this.request.mockResolvedValue(response);
    }
    public mockRequestOnce(response: Partial<IHttpClient.Response<any>>) {
        this.request.mockResolvedValueOnce(response);
    }

    public mockRequestError(error: Error) {
        this.request.mockRejectedValue(error);
    }
    public mockRequestErrorOnce(error: Error) {
        this.request.mockRejectedValueOnce(error);
    }

    public assertRequestNotCalled() {
        expect(this.request).not.toHaveBeenCalled();
    }

    public assertRequestCalledTimes(numberOfTimes: number) {
        expect(this.request).toHaveBeenCalledTimes(numberOfTimes);
    }

    public assertRequestCalledWith(params: IHttpClient.Request, numberOfTimes?: number) {
        if (numberOfTimes === undefined) {
            expect(this.request).toHaveBeenCalledWith(params);
        } else {
            expect(this.request).toHaveBeenNthCalledWith(numberOfTimes, params);
        }
    }

    public reset() {
        this.request.mockReset();
        this.request.mockRestore();
    }
}
