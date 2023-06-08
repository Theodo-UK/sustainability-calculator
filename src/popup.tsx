import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

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
    <div>
      <h1>Sustainability Calculator v2</h1>
      <button onClick={refreshAndGetSize}>Get Software Carbon Intensity</button>
      <div>
        SCI: {Math.floor((transferSize / 1073741824) * 0.81 * 212.3)} gCO2eq
      </div>
    </div>
  );
};

const rootElement = document.getElementById("react-target");
// @ts-ignore
createRoot(rootElement).render(<Popup />);
