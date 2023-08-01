import { act, renderHook } from "@testing-library/react";
import {
    mockChrome,
    mockTabId,
} from "../../../../utils/test-objects/mockChrome";
import { mockProviderWrapper } from "../../../../utils/test-objects/mockProviderWrapper";
import { useRecordingContext } from "../useRecordingContext";

(global as any).chrome = mockChrome;

describe("useRecordingContext", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("refreshAndGetSize should refresh the tab and send a message to runtime to start recording", async () => {
        const { result } = renderHook(useRecordingContext, {
            wrapper: mockProviderWrapper,
        });

        await act(async () => {
            await result.current.startRecording();
        });

        expect(chrome.tabs.reload).toHaveBeenCalledTimes(1);

        expect(chrome.runtime.sendMessage).toBeCalledWith({
            command: "startRecordingBytesTransferred",
            tabId: mockTabId,
        });
    });
    it("stopRecording send a message to runtime to stop recording", async () => {
        const { result } = renderHook(useRecordingContext, {
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
