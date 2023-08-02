import { act, renderHook } from "@testing-library/react";
import { RecordingRepository } from "../../../../data/recording/RecordingRepository";
import {
    mockChrome,
    mockTabId,
} from "../../../../utils/test-objects/mockChrome";
import { mockProviderWrapper } from "../../../../utils/test-objects/mockProviderWrapper";
import { useRecording } from "../useRecording";

(global as any).chrome = mockChrome;

describe("useRecording", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("refreshAndGetSize should refresh the tab and send a message to runtime to start recording", async () => {
        const { result } = renderHook(useRecording, {
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
        const { result } = renderHook(useRecording, {
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

describe("stopRecording", () => {
    it("should call RecordingRepository.setOngoingCalculation and RecordingRepository.clearStartUnixTime", async () => {
        const { result } = renderHook(useRecording, {
            wrapper: mockProviderWrapper,
        });

        await act(async () => {
            await result.current.stopRecording();
        });

        expect(RecordingRepository.setOngoingCalculation).toHaveBeenCalledWith(
            false
        );
        expect(RecordingRepository.clearStartUnixTime).toHaveBeenCalled();
    });
});
