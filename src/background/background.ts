import { IBytesRepository } from "../data/bytes/IBytesRepository";
import { addBytesTransferred } from "./backgroundHelpers";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getBytesTransferred") {
        sendResponse(IBytesRepository.instance.getBytesTransferred());
    }

    const { tabId } = message;

    if (message.command === "startRecordingBytesTransferred") {
        IBytesRepository.instance.clearBytesTransferred();

        chrome.tabs.get(tabId).then((tab) => {
            if (tab.url && tab.url.startsWith("chrome://")) {
                sendResponse({
                    success: false,
                    message:
                        "Cannot calculate emissions for a chrome:// URL, e.g. manage extensions page. Please try again on a valid webpage.",
                });
            } else {
                chrome.debugger.attach({ tabId: tabId }, "1.2").then(() => {
                    chrome.debugger.sendCommand(
                        { tabId: tabId },
                        "Network.enable",
                        {},
                        () => {
                            if (chrome.runtime.lastError) {
                                console.error(chrome.runtime.lastError);
                            }
                            sendResponse({
                                success: true,
                                message:
                                    "Successfully started recording bytes transferred.",
                            });
                        }
                    );
                });
            }
        });
    }

    if (message.command === "stopRecordingBytesTransferred") {
        chrome.debugger
            .detach({ tabId: tabId })
            .then(() => {
                sendResponse(true);
            })
            .catch((e: unknown) => {
                if (
                    (e as Error).message ===
                    `Debugger is not attached to the tab with id: ${tabId}.`
                ) {
                    console.warn(
                        `Tried to detach debugger from tab (tabId: ${tabId}) when there was none attached. `
                    );
                    return;
                }
                throw e;
            });
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
