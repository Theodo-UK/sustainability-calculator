import { IBytesRepository } from "../data/bytes/IBytesRepository";

export const addBytesTransferred = async (bytes: number) => {
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
                console.warn(
                    `Error Caught: ${e}\nIf popup is open and this error is seen in the console, debugging is required.`
                );
            }
        } else {
            throw e;
        }
    }
};
