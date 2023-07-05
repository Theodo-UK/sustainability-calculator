import { IBytesRepository } from "./data/bytes/IBytesRepository";

const webRequestContentLengthListener = (
    details: chrome.webRequest.WebResponseCacheDetails
) => {
    const headers = details.responseHeaders;
    const contentLength = headers?.find(
        (header) => header.name.toLowerCase() === "content-length"
    );

    if (contentLength?.value) {
        IBytesRepository.instance.addBytesTransferred(
            parseInt(contentLength.value, 10)
        );
    }
};

const webRequestOnBeforeRequestListener = (
    details: chrome.webRequest.WebRequestBodyDetails
) => {
    if (details.method === "POST") {
        const bodySize = details.requestBody?.raw?.[0].bytes?.byteLength;
        if (bodySize) {
            IBytesRepository.instance.addBytesTransferred(bodySize);
        }
    }
};

const webRequestOnBeforeSendHeaders = (
    details: chrome.webRequest.WebRequestHeadersDetails
) => {
    if (details.method === "POST" || details.method === "GET") {
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
    } else {
        throw new Error("onBeforeSendHeadersListener: Not implemented");
    }
};

chrome.runtime.onMessage.addListener((message) => {
    const { tabId } = message;

    if (message.command === "startStoringWebRequestPayloadSize") {
        chrome.webRequest.onBeforeRequest.addListener(
            webRequestOnBeforeRequestListener,
            { urls: ["<all_urls>"], tabId },
            ["requestBody"]
        );
        chrome.webRequest.onBeforeSendHeaders.addListener(
            webRequestOnBeforeSendHeaders,
            { urls: ["<all_urls>"], tabId },
            ["requestHeaders"]
        );
        chrome.webRequest.onCompleted.addListener(
            webRequestContentLengthListener,
            { urls: ["<all_urls>"], tabId },
            ["responseHeaders"]
        );
    }

    if (message.command === "stopStoringWebRequestPayloadSize") {
        chrome.webRequest.onCompleted.removeListener(
            webRequestContentLengthListener
        );
    }

    return true;
});
