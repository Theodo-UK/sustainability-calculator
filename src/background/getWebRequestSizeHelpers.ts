export const getRequestHeaderSize = (
    details: chrome.webRequest.WebRequestHeadersDetails
): number => {
    return (
        details.requestHeaders?.reduce((acc, header) => {
            const encoder = new TextEncoder();
            const headerLength = encoder.encode(
                header.name + ": " + (header.value ?? "")
            ).length;
            return acc + headerLength;
        }, 0) ?? 0
    );
};

export const getBodySize = (
    details: chrome.webRequest.WebRequestBodyDetails
): number => {
    return details.requestBody?.raw?.[0].bytes?.byteLength ?? 0;
};

export const getBodySizeFromContentLengthHeader = (
    details: chrome.webRequest.WebResponseHeadersDetails
): number => {
    const contentLengthHeader = details.responseHeaders?.find(
        (header) => header.name.toLowerCase() === "content-length"
    );

    const bodySize =
        contentLengthHeader?.value !== undefined
            ? parseInt(contentLengthHeader.value, 10)
            : 0;

    return bodySize;
};

export const getResponseHeaderSize = (
    details: chrome.webRequest.WebResponseHeadersDetails
): number => {
    return (
        details.responseHeaders?.reduce((acc, header) => {
            const encoder = new TextEncoder();
            const headerLength = encoder.encode(
                header.name + ": " + (header.value ?? "")
            ).length;
            return acc + headerLength;
        }, 0) ?? 0
    );
};
