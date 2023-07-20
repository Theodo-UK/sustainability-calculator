import { IBytesRepository } from "../data/bytes/IBytesRepository";
import { NetworkRequestManager } from "./network_request_manager/NetworkRequestManager";
import { formatBytesString } from "../view/popup/utils/formatBytesString";

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
            const { requestId, response } = params as {
                requestId?: string;
                response?: {
                    encodedDataLength?: number;
                };
            };
            if (
                requestId === undefined ||
                response === undefined ||
                response.encodedDataLength === undefined
            ) {
                throw new Error(
                    `requestId or encodedDataLength is undefined: \nrequestId: ${requestId} \nencodedDataLength: ${response?.encodedDataLength}`
                );
            }
            NetworkRequestManager.setRequestTransferSize(
                requestId,
                response.encodedDataLength
            );

            break;
        }
        case "Network.dataReceived": {
            const { requestId, encodedDataLength } = params as {
                requestId?: string;
                encodedDataLength?: number;
            };
            if (requestId === undefined || encodedDataLength === undefined) {
                throw new Error(
                    `requestId or encodedDataLength is undefined: \nrequestId: ${requestId} \nencodedDataLength: ${encodedDataLength}`
                );
            }
            NetworkRequestManager.increaseRequestTransferSize(
                requestId,
                encodedDataLength
            );

            break;
        }
        case "Network.loadingFinished": {
            const { requestId, encodedDataLength } = params as {
                requestId?: string;
                encodedDataLength?: number;
            };
            if (requestId === undefined || encodedDataLength === undefined) {
                throw new Error(
                    `requestId or encodedDataLength is undefined: \nrequestId: ${requestId} \nencodedDataLength: ${encodedDataLength}`
                );
            }
            NetworkRequestManager.setRequestTransferSize(
                requestId,
                encodedDataLength
            );

            break;
        }
        case "Network.loadingFailed": {
            const { requestId } = params as {
                requestId?: string;
            };
            if (requestId === undefined) {
                throw new Error("requestId is undefined");
            }
            NetworkRequestManager.setRequestTransferSize(requestId, -1);

            break;
        }

        case "Network.webSocketClosed": {
            const { requestId } = params as {
                requestId?: string;
            };
            if (requestId === undefined) {
                throw new Error("requestId is undefined");
            }
            NetworkRequestManager.setRequestTransferSize(requestId, -1);

            break;
        }
        case "Network.webTransportClosed": {
            const { requestId } = params as {
                requestId?: string;
            };
            if (requestId === undefined) {
                throw new Error("requestId is undefined");
            }
            NetworkRequestManager.setRequestTransferSize(requestId, -1);

            break;
        }
        case "Network.requestWillBeSent": {
            const { requestId } = params as {
                requestId?: string;
            };
            if (requestId === undefined) {
                throw new Error("requestId is undefined");
            }

            NetworkRequestManager.addRequest(requestId);

            break;
        }
        default:
            break;
    }
});
