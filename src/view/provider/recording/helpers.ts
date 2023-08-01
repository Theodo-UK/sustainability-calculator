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
