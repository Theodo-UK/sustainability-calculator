import { IBytesRepository } from "../data/bytes/IBytesRepository";
import { addBytesTransferred } from "./webRequestListeners";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getBytesTransferred") {
        sendResponse(IBytesRepository.instance.getBytesTransferred());
    }

    const { tabId } = message;

    if (message.command === "startRecordingBytesTransferred") {
        IBytesRepository.instance.clearBytesTransferred();

        chrome.debugger.attach({ tabId: tabId }, "1.2", function () {
            chrome.debugger.sendCommand(
                { tabId: tabId },
                "Network.enable",
                {},
                function () {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    }
                }
            );
        });

        sendResponse(true);
    }

    if (message.command === "stopRecordingBytesTransferred") {
        chrome.debugger.detach({ tabId: tabId });
        sendResponse(true);
    }
    return true;
});

chrome.debugger.onEvent.addListener(function (source, method, params) {
    switch (method) {
        case "Network.responseReceived": {
            // const { response } = params as {
            //     response?: {
            //         encodedDataLength?: number;
            //     };
            // };
            // // console.log("Network.responseReceived:", response);
            // if (response?.encodedDataLength) {
            //     addBytesTransferred(response.encodedDataLength);
            // }
            break;
        }
        case "Network.dataReceived": {
            // const { encodedDataLength } = params as {
            //     encodedDataLength?: number;
            // };
            // // console.log("Network.dataReceived:", encodedDataLength);
            // if (encodedDataLength) {
            //     addBytesTransferred(encodedDataLength);
            // }
            break;
        }
        case "Network.loadingFinished": {
            // console.log("Network.loadingFinished:", source, params);
            const { encodedDataLength } = params as {
                encodedDataLength?: number;
            };
            // console.log("Network.loadingFinished:", encodedDataLength);
            if (encodedDataLength) {
                addBytesTransferred(encodedDataLength);
            }
            break;
        }
        case "Network.loadingFailed": {
            // console.log("Network.loadingFailed:", params);
            // const { encodedDataLength } = params as {
            //     encodedDataLength?: number;
            // };
            // console.log("Network.loadingFailed:", encodedDataLength);
            // if (encodedDataLength) {
            //     addBytesTransferred(encodedDataLength);
            // }
            break;
        }

        case "Network.signedExchangeReceived": {
            // const { encodedDataLength } = params as {
            //     encodedDataLength?: number;
            // };
            // // console.log("Network.signedExchangeReceived:", encodedDataLength);
            // if (encodedDataLength) {
            //     addBytesTransferred(encodedDataLength);
            // }
            break;
        }

        case "Network.webSocketClosed": {
            // console.log("Network.webSocketClosed:", params);
            // const { encodedDataLength } = params as {
            //     encodedDataLength?: number;
            // };
            // console.log("Network.webSocketClosed:", encodedDataLength);
            // if (encodedDataLength) {
            //     addBytesTransferred(encodedDataLength);
            // }
            break;
        }
        case "Network.webTransportClosed": {
            // console.log("Network.webTransportClosed:", params);
            // const { encodedDataLength } = params as {
            //     encodedDataLength?: number;
            // };
            // console.log("Network.webTransportClosed:", encodedDataLength);
            // if (encodedDataLength) {
            //     addBytesTransferred(encodedDataLength);
            // }
            break;
        }
        case "Network.requestWillBeSent": {
            // console.log("Network.requestWillBeSent:", params);
            // const { request } = params as {
            //     request?: {
            //         url?: string;
            //     };
            // };
            // if (request?.url) {
            //     console.log(
            //         "Network.requestWillBeSent: redirect detected",
            //         params,
            //         request.url
            //     );
            // }
            // const { encodedDataLength } = params as {
            //     encodedDataLength?: number;
            // };
            // console.log("Network.requestWillBeSent:", encodedDataLength);
            // if (encodedDataLength) {
            //     addBytesTransferred(encodedDataLength);
            // }
            break;
        }
        default:
            break;
    }
});
