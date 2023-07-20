import { IBytesRepository } from "../data/bytes/IBytesRepository";
import { addBytesTransferred } from "./backgroundHelpers";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getBytesTransferred") {
        sendResponse(IBytesRepository.instance.getBytesTransferred());
    }

    const { tabId } = message;

    if (message.command === "startRecordingBytesTransferred") {
        IBytesRepository.instance.clearBytesTransferred();

        chrome.debugger.attach({ tabId: tabId }, "1.2", function () {
            chrome.debugger.sendCommand(
                { tabId: tabId },
                "Network.enable",
                {},
                function () {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    }
                }
            );
        });

        sendResponse(true);
    }

    if (message.command === "stopRecordingBytesTransferred") {
        chrome.debugger.detach({ tabId: tabId });
        sendResponse(true);
    }
    return true;
});

chrome.debugger.onEvent.addListener(function (source, method, params) {
    switch (method) {
        case "Network.loadingFinished": {
            const { encodedDataLength } = params as {
                encodedDataLength?: number;
            };
            if (encodedDataLength) {
                addBytesTransferred(encodedDataLength);
            }
            break;
        }
        default:
            break;
    }
});
