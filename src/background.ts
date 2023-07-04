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

chrome.runtime.onMessage.addListener((message) => {
    const { tabId } = message;

    if (message.command === "startStoringWebRequestPayloadSize") {
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
