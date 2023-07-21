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
        }
        sendResponse(true);
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
