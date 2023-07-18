import { IBytesRepository } from "../data/bytes/IBytesRepository";
import {
    catchPostRequestBodySize,
    catchRequestHeaderSize,
    catchResponseSize,
} from "./webRequestListeners";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getBytesTransferred") {
        sendResponse(IBytesRepository.instance.getBytesTransferred());
    }

    const { tabId } = message;

    if (message.command === "startRecordingBytesTransferred") {
        IBytesRepository.instance.clearBytesTransferred();

        chrome.webRequest.onBeforeRequest.addListener(
            catchPostRequestBodySize,
            { urls: ["<all_urls>"], tabId },
            ["requestBody"]
        );
        chrome.webRequest.onBeforeSendHeaders.addListener(
            catchRequestHeaderSize,
            { urls: ["<all_urls>"], tabId },
            ["requestHeaders"]
        );
        chrome.webRequest.onCompleted.addListener(
            catchResponseSize,
            { urls: ["<all_urls>"], tabId },
            ["responseHeaders"]
        );
        sendResponse(true);
    }

    if (message.command === "stopRecordingBytesTransferred") {
        chrome.webRequest.onCompleted.removeListener(catchResponseSize);
        chrome.webRequest.onBeforeRequest.removeListener(
            catchPostRequestBodySize
        );
        chrome.webRequest.onBeforeSendHeaders.removeListener(
            catchRequestHeaderSize
        );
        sendResponse(true);
    }
    return true;
});
