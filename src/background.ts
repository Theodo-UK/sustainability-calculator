chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "startStoringWebRequestPayloadSize") {
        const { tabId } = message;
        chrome.webRequest.onCompleted.addListener(
            (details) => {
                if (details.tabId === tabId) {
                    const headers = details.responseHeaders;
                    const contentLength = headers?.find(
                        (header) =>
                            header.name.toLowerCase() === "content-length"
                    );

                    if (contentLength?.value) {
                        updateTotalBytesReceived(
                            parseInt(contentLength.value, 10)
                        );
                    }
                }
            },
            { urls: ["<all_urls>"], tabId },
            ["responseHeaders"]
        );
    }

    return true;
});

const updateTotalBytesReceived = async (bytesReceived: number) => {
    const previousTotalBytesReceived = (
        await chrome.storage.local.get("totalBytesReceived")
    )["totalBytesReceived"];
    const totalBytesReceived = previousTotalBytesReceived + bytesReceived;
    chrome.storage.local.set({ totalBytesReceived });
};
