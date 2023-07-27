export const backgroundStopRecordingBytes = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs.length > 0) {
        const activeTabId = tabs[0].id;
        if (activeTabId) {
            chrome.runtime.sendMessage({
                command: "stopRecordingBytesTransferred",
                activeTabId,
            });
        }
    }
};
