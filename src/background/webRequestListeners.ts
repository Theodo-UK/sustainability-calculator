import { IBytesRepository } from "../data/bytes/IBytesRepository";
import {
    getBodySize,
    getBodySizeFromContentLengthHeader,
    getRequestHeaderSize,
    getResponseHeaderSize,
} from "./getWebRequestSizeHelpers";

const addBytesTransferred = async (bytes: number) => {
    IBytesRepository.instance.addBytesTransferred(bytes);

    try {
        await chrome.runtime.sendMessage({
            command: {
                bytesTransferredChanged:
                    IBytesRepository.instance.getBytesTransferred(),
            },
        });
    } catch (e: unknown) {
        if (e instanceof Error) {
            if (
                e.message ===
                "Could not establish connection. Receiving end does not exist."
            ) {
                console.log(
                    `Error Caught: ${e}\nIf popup is open and this error is seen in the console, debugging is required.`
                );
            }
        } else {
            throw e;
        }
    }
};

export const catchResponseSize = (
    details: chrome.webRequest.WebResponseCacheDetails
) => {
    const headerSize = getResponseHeaderSize(details);

    const bodySize = getBodySizeFromContentLengthHeader(details);

    addBytesTransferred(headerSize + bodySize);
};

export const catchPostRequestBodySize = (
    details: chrome.webRequest.WebRequestBodyDetails
) => {
    if (details.method === "POST") {
        const bodySize = getBodySize(details);

        if (bodySize > 0) {
            addBytesTransferred(bodySize);
        }
    }
};

export const catchRequestHeaderSize = (
    details: chrome.webRequest.WebRequestHeadersDetails
) => {
    const headerSize = getRequestHeaderSize(details);

    if (headerSize > 0) {
        addBytesTransferred(headerSize);
    }
};
