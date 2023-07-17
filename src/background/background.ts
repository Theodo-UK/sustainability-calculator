import { IBytesRepository } from "../data/bytes/IBytesRepository";
import {
    webRequestOnBeforeRedirectListener,
    webRequestOnBeforeRequestListener,
    webRequestOnBeforeSendHeaders,
    webRequestOnCompleteListener,
    webRequestOnHeadersReceivedListener,
    webRequestOnResponseStartedListener,
} from "./webRequestListeners";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { tabId } = message;

    if (message.command === "startRecordingBytesTransferred") {
        chrome.webRequest.onBeforeRedirect.addListener(
            webRequestOnBeforeRedirectListener,
            { urls: ["<all_urls>"], tabId },
            ["responseHeaders"]
        );
        chrome.webRequest.onHeadersReceived.addListener(
            webRequestOnHeadersReceivedListener,
            { urls: ["<all_urls>"], tabId },
            ["responseHeaders"]
        );
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
        chrome.webRequest.onResponseStarted.addListener(
            webRequestOnResponseStartedListener,
            { urls: ["<all_urls>"], tabId },
            ["responseHeaders"]
        );
    }

    if (message.command === "stopRecordingBytesTransferred") {
        chrome.webRequest.onCompleted.removeListener(
            webRequestOnCompleteListener
        );
        chrome.webRequest.onBeforeRedirect.removeListener(
            webRequestOnBeforeRedirectListener
        );
        chrome.webRequest.onHeadersReceived.removeListener(
            webRequestOnHeadersReceivedListener
        );
        chrome.webRequest.onBeforeRequest.removeListener(
            webRequestOnBeforeRequestListener
        );
        chrome.webRequest.onBeforeSendHeaders.removeListener(
            webRequestOnBeforeSendHeaders
        );
        chrome.webRequest.onResponseStarted.removeListener(
            webRequestOnResponseStartedListener
        );
    }
    sendResponse(true);
    return true;
});
