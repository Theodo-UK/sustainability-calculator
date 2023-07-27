import { IBytesRepository } from "../data/bytes/IBytesRepository";
import {
    addBytesTransferred,
    startRecordingBytesTransferred,
    stopRecordingBytesTransferred,
} from "./backgroundHelpers";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getBytesTransferred") {
        sendResponse(IBytesRepository.instance.getBytesTransferred());
    }

    const { tabId } = message;

    if (message.command === "startRecordingBytesTransferred") {
        startRecordingBytesTransferred(tabId, sendResponse);
    }

    if (message.command === "stopRecordingBytesTransferred") {
        stopRecordingBytesTransferred(tabId, sendResponse);
    }
    return true;
});

type NetworkParamsType = {
    encodedDataLength?: number;
};

chrome.debugger.onEvent.addListener(
    (source, method: string, params: NetworkParamsType | undefined) => {
        switch (method) {
            case "Network.loadingFinished": {
                if (params?.encodedDataLength && params.encodedDataLength > 0) {
                    addBytesTransferred(params.encodedDataLength);
                }
                break;
            }
            default:
                break;
        }
    }
);
