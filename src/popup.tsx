import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { FormattedMessage } from "react-intl";
import { Intl } from "./providers/Intl";

export const Popup = () => {
  const [transferSize, setTransferSize] = useState(0);

  const refreshAndGetSize = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        // @ts-ignore
        chrome.tabs.reload(tabId, () => {
          setTimeout(() => {
            chrome.runtime.sendMessage({ command: "getTransferSize", tabId });
          }, 2000);
        });
      }
    });
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.transferSize) {
        setTransferSize(message.transferSize);
      }
    });
  }, []);

  return (
    <Intl defaultLocale="en">
      <div>
        <FormattedMessage id={"homeScreen.title"} />
        <button onClick={refreshAndGetSize}>
          <FormattedMessage id={"homeScreen.calculate"} />
        </button>
        <div>
          SCI: {Math.floor((transferSize / 1073741824) * 0.81 * 212.3)} gCO2eq
        </div>
      </div>
    </Intl>
  );
};

const rootElement = document.getElementById("react-target");
// @ts-ignore
createRoot(rootElement).render(<Popup />);
