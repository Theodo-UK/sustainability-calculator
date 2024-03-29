import { BytesRepository } from "../data/bytes/BytesRepository";

export const debuggingProtocolVersion = "1.2";
export const addBytesTransferred = async (bytes: number) => {
    BytesRepository.addBytesTransferred(bytes);

    try {
        await chrome.runtime.sendMessage({
            command: {
                bytesTransferredChanged: BytesRepository.getBytesTransferred(),
            },
        });
    } catch (error: unknown) {
        if (
            (error as Error).message ===
            "Could not establish connection. Receiving end does not exist."
        ) {
            console.warn(
                `Error Caught: ${error}\nIf popup is open and this error is seen in the console, debugging is required.`
            );
        } else {
            throw error;
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
    BytesRepository.clearBytesTransferred();

    chrome.tabs.get(tabId).then((tab) => {
        if (tab.url && tab.url.startsWith("chrome://")) {
            sendResponse({
                success: false,
                message:
                    "Cannot calculate emissions for a chrome:// URL, e.g. manage extensions page. Please try again on a valid webpage.",
            });
            return;
        } else {
            chrome.debugger
                .attach({ tabId }, debuggingProtocolVersion)
                .then(() => {
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
        .catch((error: unknown) => {
            if (
                (error as Error).message ===
                `Debugger is not attached to the tab with id: ${tabId}.`
            ) {
                console.warn(
                    `Tried to detach debugger from tab (tabId: ${tabId}) when there was none attached. `
                );
                sendResponse(false);
                return;
            }
            throw error;
        });
};
