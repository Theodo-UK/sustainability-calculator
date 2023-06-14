chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

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
