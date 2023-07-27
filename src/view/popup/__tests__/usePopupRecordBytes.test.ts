import { act, renderHook } from "@testing-library/react";

import { mockChrome, mockTabId } from "../../../utils/test-objects/mockChrome";
import { mockProviderWrapper } from "../../../utils/test-objects/mockProviderWrapper";
import { usePopup } from "../usePopup";

(global as any).chrome = mockChrome;

describe("usePopup", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("refreshAndGetSize should refresh the tab and send a message to runtime to start recording", async () => {
        const { result } = renderHook(usePopup, {
            wrapper: mockProviderWrapper,
        });

        await act(async () => {
            await result.current.refreshAndGetSize();
        });

        expect(chrome.tabs.query).toHaveBeenCalledTimes(1);

        expect(chrome.tabs.reload).toHaveBeenCalledTimes(1);

        expect(chrome.runtime.sendMessage).toHaveBeenCalledTimes(2);
        expect(chrome.runtime.sendMessage).toBeCalledWith(
            "getBytesTransferred"
        );
        expect(chrome.runtime.sendMessage).toBeCalledWith({
            command: "startRecordingBytesTransferred",
            tabId: mockTabId,
        });
    });
    it("stopRecording send a message to runtime to stop recording", async () => {
        const { result } = renderHook(usePopup, {
            wrapper: mockProviderWrapper,
        });

        await act(async () => {
            await result.current.stopRecording();
        });

        expect(chrome.runtime.sendMessage).toBeCalledWith({
            command: "stopRecordingBytesTransferred",
            tabId: mockTabId,
        });
    });
});
