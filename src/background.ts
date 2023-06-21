chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.command === "startStoringWebRequestPayloadSize") {
    const { tabId } = message;
    chrome.webRequest.onCompleted.addListener(
      (details) => {
        if (details.tabId === tabId) {
          const headers = details.responseHeaders;
          const transferSizeHeader = headers?.find(
            (header) => header.name.toLowerCase() === "content-length"
          );

          if (transferSizeHeader?.value) {
            const transferSize = parseInt(transferSizeHeader.value, 10);
            updateTotalTransferSize(transferSize)
          }
        }
      },
      { urls: ["<all_urls>"], tabId },
      ["responseHeaders"]
    );
  }

  return true;
});

const updateTotalTransferSize = async (transferSize: number) => {
  const previousTransferSize = (await chrome.storage.local.get("totalTransferSize"))["totalTransferSize"]
  const totalTransferSize = previousTransferSize + transferSize
  chrome.storage.local.set({ totalTransferSize });
}

