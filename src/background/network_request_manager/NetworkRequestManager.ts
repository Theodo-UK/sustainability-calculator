export abstract class NetworkRequestManager {
    private static networkRequests: Map<string, number> = new Map<
        string,
        number
    >();

    static clearNetworkRequests(): void {
        NetworkRequestManager.networkRequests = new Map<string, number>();
    }

    static getTransferredBytes(): number {
        let bytesTransferred = 0;
        NetworkRequestManager.networkRequests.forEach((value) => {
            if (value > 0) {
                bytesTransferred += value;
            }
        });
        return bytesTransferred;
    }

    static addRequest(requestId: string): void {
        if (NetworkRequestManager.networkRequests.has(requestId)) {
            NetworkRequestManager.networkRequests.set(requestId, 0);
            return;
        }
        NetworkRequestManager.networkRequests.set(requestId, 0);
    }

    static setRequestTransferSize(
        requestId: string,
        encodedDataLength: number
    ): void {
        NetworkRequestManager.networkRequests.set(requestId, encodedDataLength);
    }

    static increaseRequestTransferSize(
        requestId: string,
        encodedDataLength: number
    ): void {
        if (!NetworkRequestManager.networkRequests.has(requestId)) {
            throw new Error("Request not found");
        }

        const previous = NetworkRequestManager.networkRequests.get(requestId);

        if (previous === undefined) {
            throw new Error("Request not found");
        }

        NetworkRequestManager.networkRequests.set(
            requestId,
            previous + encodedDataLength
        );
    }
}
