export const backgroundStopRecordingBytes = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tabId = tabs[0].id;
            if (tabId) {
                chrome.runtime.sendMessage({
                    command: "stopRecordingBytesTransferred",
                    tabId,
                });
            }
        }
    });
};
