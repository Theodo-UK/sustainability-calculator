import { IBytesRepository } from "../data/bytes/IBytesRepository";

export const webRequestOnBeforeRedirectListener = (
    details: chrome.webRequest.WebRedirectionResponseDetails
) => {
    // When server response starts,
    // catch response header+body size
    const headerSize =
        details.responseHeaders?.reduce((acc, header) => {
            const encoder = new TextEncoder();
            const headerLength = encoder.encode(
                header.name + ": " + (header.value ?? "")
            ).length;
            return acc + headerLength;
        }, 0) ?? 0;

    const contentLengthHeader = details.responseHeaders?.find(
        (header) => header.name.toLowerCase() === "content-length"
    );

    const bodySize =
        contentLengthHeader?.value !== undefined
            ? parseInt(contentLengthHeader.value, 10)
            : 0;

    IBytesRepository.instance.addBytesTransferred(headerSize + bodySize);
    // console.log(
    //     `webRequestOnBeforeRedirectListener, ${details.url}, ${details.type}, ${
    //         headerSize + bodySize
    //     }`
    // );
};
export const webRequestOnHeadersReceivedListener = (
    details: chrome.webRequest.WebResponseHeadersDetails
) => {
    // When server response starts,
    // catch response header+body size
    const headerSize =
        details.responseHeaders?.reduce((acc, header) => {
            const encoder = new TextEncoder();
            const headerLength = encoder.encode(
                header.name + ": " + (header.value ?? "")
            ).length;
            return acc + headerLength;
        }, 0) ?? 0;

    const contentLengthHeader = details.responseHeaders?.find(
        (header) => header.name.toLowerCase() === "content-length"
    );

    const bodySize =
        contentLengthHeader?.value !== undefined
            ? parseInt(contentLengthHeader.value, 10)
            : 0;

    IBytesRepository.instance.addBytesTransferred(headerSize + bodySize);
    // console.log(
    //     `webRequestOnHeadersReceivedListener, ${details.url}, ${
    //         details.type
    //     }, ${headerSize + bodySize}`
    // );
};
export const webRequestOnResponseStartedListener = (
    details: chrome.webRequest.WebResponseCacheDetails
) => {
    // When server response starts,
    // catch response header+body size
    const headerSize =
        details.responseHeaders?.reduce((acc, header) => {
            const encoder = new TextEncoder();
            const headerLength = encoder.encode(
                header.name + ": " + (header.value ?? "")
            ).length;
            return acc + headerLength;
        }, 0) ?? 0;

    const contentLengthHeader = details.responseHeaders?.find(
        (header) => header.name.toLowerCase() === "content-length"
    );

    const bodySize =
        contentLengthHeader?.value !== undefined
            ? parseInt(contentLengthHeader.value, 10)
            : 0;

    IBytesRepository.instance.addBytesTransferred(headerSize + bodySize);
    // console.log(
    //     `webRequestOnResponseStartedListener, ${details.url}, ${
    //         details.type
    //     }, ${headerSize + bodySize}`
    // );
};

export const webRequestOnCompleteListener = (
    details: chrome.webRequest.WebResponseCacheDetails
) => {
    // When server response completes,
    // catch response header+body size
    // Used when the server pushes content out without telling in advance how big it is, the only point where that information would be available is at the onCompleted event.
    const headerSize =
        details.responseHeaders?.reduce((acc, header) => {
            const encoder = new TextEncoder();
            const headerLength = encoder.encode(
                header.name + ": " + (header.value ?? "")
            ).length;
            return acc + headerLength;
        }, 0) ?? 0;

    const contentLengthHeader = details.responseHeaders?.find(
        (header) => header.name.toLowerCase() === "content-length"
    );

    const bodySize =
        contentLengthHeader?.value !== undefined
            ? parseInt(contentLengthHeader.value, 10)
            : 0;

    // console.log(
    //     `webRequestOnCompleteListener, ${details.url}, ${details.type}, ${
    //         headerSize + bodySize
    //     }`
    // );

    IBytesRepository.instance.addBytesTransferred(headerSize + bodySize);
};

export const webRequestOnBeforeRequestListener = (
    details: chrome.webRequest.WebRequestBodyDetails
) => {
    // When client makes a request,
    // catch body size
    const bodySize = details.requestBody?.raw?.[0].bytes?.byteLength;

    if (bodySize) {
        IBytesRepository.instance.addBytesTransferred(bodySize);
    }
    // console.log(
    //     `webRequestOnBeforeRequestListener, ${details.url}, ${details.type}, ${bodySize}`
    // );
};

export const webRequestOnBeforeSendHeaders = (
    details: chrome.webRequest.WebRequestHeadersDetails
) => {
    // When client makes a request,
    // catch header size
    const headerSize = details.requestHeaders?.reduce((acc, header) => {
        const encoder = new TextEncoder();
        const headerLength = encoder.encode(
            header.name + ": " + (header.value ?? "")
        ).length;
        return acc + headerLength;
    }, 0);
    if (headerSize !== undefined && headerSize > 0) {
        IBytesRepository.instance.addBytesTransferred(headerSize);
    }
    // console.log(
    //     `webRequestOnBeforeSendHeaders, ${details.url}, ${details.type}, ${headerSize}`
    // );
};
