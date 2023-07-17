export const refreshActiveTabAndRecordBytes = async (bypassCache: boolean) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tabId = tabs[0].id;
            if (tabId) {
                chrome.tabs.reload(
                    tabId,
                    {
                        bypassCache: bypassCache,
                    },
                    () => {
                        chrome.runtime.sendMessage({
                            command: "startRecordingBytesTransferred",
                            tabId,
                        });
                    }
                );
            }
        }
    });
};
