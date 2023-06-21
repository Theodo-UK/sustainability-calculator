chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.command === "getTransferSize") {
    console.log("received getTransferSize message in background.js")
    const { tabId } = message;
    chrome.webRequest.onCompleted.addListener(
      (details) => {
        console.log("webRequest.onCompleted called in background.js")
        if (details.tabId === tabId) {
          const headers = details.responseHeaders;
          const transferSizeHeader = headers.find(
            (header) => header.name.toLowerCase() === "content-length"
          );

          if (transferSizeHeader) {

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

const updateTotalTransferSize = async (transferSize) => {
  const previousTransferSize = (await chrome.storage.local.get("totalTransferSize"))["totalTransferSize"]
  const totalTransferSize = previousTransferSize + transferSize
  // console.log("previousTransferSize in storage: ", previousTransferSize)
  // console.log("transferSize: ", transferSize)
  console.log("totalTransferSize: ", totalTransferSize)
  chrome.storage.local.set({ totalTransferSize });
}

