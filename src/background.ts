import { IBytesRepository } from "./data/bytes/IBytesRepository";

const updateTotalBytesTransferred = async (bytesReceived: number) => {
    await IBytesRepository.instance.addBytesTransferred(bytesReceived);
};

const webRequestContentLengthListener = (
    details: chrome.webRequest.WebResponseCacheDetails
) => {
    const headers = details.responseHeaders;
    const contentLength = headers?.find(
        (header) => header.name.toLowerCase() === "content-length"
    );

    if (contentLength?.value) {
        updateTotalBytesTransferred(parseInt(contentLength.value, 10));
    }
};

const webRequestOnBeforeRequestListener = (
    details: chrome.webRequest.WebRequestBodyDetails
) => {
    if (details.method === "POST") {
        const bodySize = details.requestBody?.raw?.[0].bytes?.byteLength;
        if (bodySize) {
            updateTotalBytesTransferred(bodySize);
        }
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
