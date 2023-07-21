import { IBytesRepository } from "../data/bytes/IBytesRepository";
import { addBytesTransferred } from "./backgroundHelpers";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message === "getBytesTransferred") {
        sendResponse(IBytesRepository.instance.getBytesTransferred());
    }

    const { tabId } = message;

    if (message.command === "startRecordingBytesTransferred") {
        IBytesRepository.instance.clearBytesTransferred();

        chrome.debugger.attach({ tabId: tabId }, "1.2", () => {
            chrome.debugger.sendCommand(
                { tabId: tabId },
                "Network.enable",
                {},
                () => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    }
                }
            );
        });

        sendResponse(true);
    }

    if (message.command === "stopRecordingBytesTransferred") {
        try {
            await chrome.debugger.detach({ tabId: tabId });
        } catch (e: unknown) {
            if (e instanceof Error) {
                if (
                    e.message ===
                    `Debugger is not attached to the tab with id: ${tabId}.`
                ) {
                    console.warn(
                        `Tried to detach debugger from tab (tabId: ${tabId}) when there was none attached. This is expected when a calculation starts, but should not be expected when a calculation is stopped.`
                    );
                }
            }
        }
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
