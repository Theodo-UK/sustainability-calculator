import {
    webRequestOnBeforeRequestListener,
    webRequestOnBeforeSendHeaders,
    webRequestOnCompleteListener,
} from "./webRequestListeners";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
    sendResponse(true);
    return true;
});
