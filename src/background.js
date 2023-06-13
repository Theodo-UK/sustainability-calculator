console.log("background script loaded");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("background: message received");
  if (message.command === "getTransferSize") {
    const { tabId } = message;
    chrome.webRequest.onCompleted.addListener(
      (details) => {
        if (details.tabId === tabId) {
          const headers = details.responseHeaders;
          // @ts-ignore
          const transferSizeHeader = headers.find(
            (header) => header.name.toLowerCase() === "content-length"
          );

          if (transferSizeHeader) {
            console.log(`background: transferSizeHeader.value: ${transferSizeHeader.value}`)
            // @ts-ignore
            const transferSize = parseInt(transferSizeHeader.value, 10);
            chrome.runtime.sendMessage({ transferSize });
          }
        }
      },
      { urls: ["<all_urls>"], tabId },
      ["responseHeaders"]
    );
  }

  return true;
});
