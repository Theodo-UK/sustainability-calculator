import { CalculationsRepository } from "../../../data/calculations/CalculationsRepository";

export const refreshActiveTab = async (bypassCache: boolean): Promise<void> => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tabs.length > 0) {
        const activeTabId = tabs[0].id;
        if (activeTabId) {
            await chrome.tabs.reload(activeTabId, {
                bypassCache: bypassCache,
            });
        }
    }
};

export const startRecordingBytesTransferred = async (): Promise<void> => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tabs.length > 0) {
        const activeTabId = tabs[0].id;
        if (activeTabId) {
            const { success, message } = await chrome.runtime.sendMessage({
                command: "startRecordingBytesTransferred",
                tabId: activeTabId,
            });

            if (!success) {
                throw new Error(message);
            }
        }
    }
};

export const getBytesFromBackground = async (): Promise<number> => {
    return await chrome.runtime.sendMessage("getBytesTransferred");
};

export const getBytesFromStorage = async (): Promise<number> => {
    const calculationData = await CalculationsRepository.getLastCalculation();
    if (!(calculationData === null)) {
        return calculationData.bytes;
    }
    return 0;
};

export const backgroundStopRecordingBytes = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs.length > 0) {
        const activeTabId = tabs[0].id;
        if (activeTabId) {
            chrome.runtime.sendMessage({
                command: "stopRecordingBytesTransferred",
                tabId: activeTabId,
            });
        }
    }
};
