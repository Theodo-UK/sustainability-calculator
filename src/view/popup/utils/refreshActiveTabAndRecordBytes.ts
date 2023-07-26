export const refreshActiveTabAndRecordBytes = async (
    bypassCache: boolean
): Promise<void> => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tabs.length > 0) {
        const tabId = tabs[0].id;
        if (tabId) {
            await chrome.tabs.reload(tabId, {
                bypassCache: bypassCache,
            });

            const { success, message } = await chrome.runtime.sendMessage({
                command: "startRecordingBytesTransferred",
                tabId,
            });

            if (!success) {
                throw new Error(message);
            }
        }
    }
};
