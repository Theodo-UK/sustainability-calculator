import { IBytesRepository } from "../data/bytes/IBytesRepository";

export const addBytesTransferred = async (bytes: number) => {
    IBytesRepository.instance.addBytesTransferred(bytes);

    try {
        await chrome.runtime.sendMessage({
            command: {
                bytesTransferredChanged:
                    IBytesRepository.instance.getBytesTransferred(),
            },
        });
    } catch (e: unknown) {
        if (
            (e as Error).message ===
            "Could not establish connection. Receiving end does not exist."
        ) {
            console.warn(
                `Error Caught: ${e}\nIf popup is open and this error is seen in the console, debugging is required.`
            );
        } else {
            throw e;
        }
    }
};

export type StartRecordingBytesTransferredReturnType = {
    success: boolean;
    message: string;
};

export const startRecordingBytesTransferred = async (
    tabId: number,
    sendResponse: (response: StartRecordingBytesTransferredReturnType) => void
): Promise<void> => {
    IBytesRepository.instance.clearBytesTransferred();

    chrome.tabs.get(tabId).then((tab) => {
        if (tab.url && tab.url.startsWith("chrome://")) {
            sendResponse({
                success: false,
                message:
                    "Cannot calculate emissions for a chrome:// URL, e.g. manage extensions page. Please try again on a valid webpage.",
            });
            return;
        } else {
            chrome.debugger.attach({ tabId }, "1.2").then(() => {
                chrome.debugger.sendCommand(
                    { tabId },
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
                        return;
                    }
                );
            });
        }
    });
};

export const stopRecordingBytesTransferred = async (
    tabId: number,
    sendResponse: (response: boolean) => void
): Promise<void> => {
    chrome.debugger
        .detach({ tabId })
        .then(() => {
            sendResponse(true);
            return;
        })
        .catch((e: unknown) => {
            if (
                (e as Error).message ===
                `Debugger is not attached to the tab with id: ${tabId}.`
            ) {
                console.warn(
                    `Tried to detach debugger from tab (tabId: ${tabId}) when there was none attached. `
                );
                sendResponse(false);
                return;
            }
            throw e;
        });
};
