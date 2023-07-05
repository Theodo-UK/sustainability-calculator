import { IBytesRepository } from "./data/bytes/IBytesRepository";

const webRequestOnCompleteListener = (
    details: chrome.webRequest.WebResponseCacheDetails
) => {
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
};

const webRequestOnBeforeRequestListener = (
    details: chrome.webRequest.WebRequestBodyDetails
) => {
    const bodySize = details.requestBody?.raw?.[0].bytes?.byteLength;
    if (bodySize) {
        IBytesRepository.instance.addBytesTransferred(bodySize);
    }
};

const webRequestOnBeforeSendHeaders = (
    details: chrome.webRequest.WebRequestHeadersDetails
) => {
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
            webRequestOnCompleteListener,
            { urls: ["<all_urls>"], tabId },
            ["responseHeaders"]
        );
    }

    if (message.command === "stopStoringWebRequestPayloadSize") {
        chrome.webRequest.onCompleted.removeListener(
            webRequestOnCompleteListener
        );
    }

    return true;
});
