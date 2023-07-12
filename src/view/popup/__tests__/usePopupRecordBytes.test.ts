import { renderHook, act } from "@testing-library/react";

import { usePopup } from "../usePopup";
import { mockChrome, mockTabId } from "../../../utils/test-objects/mockChrome";

(global as any).chrome = mockChrome;

describe("usePopup", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("refreshAndGetSize should refresh the tab and send a message to runtime to start recording", async () => {
        const { result } = renderHook(() => usePopup());

        await act(async () => {
            await result.current.refreshAndGetSize(false);
        });

        expect(chrome.tabs.query).toHaveBeenCalledTimes(1);
        expect(chrome.tabs.reload).toHaveBeenCalledTimes(1);
        expect(chrome.runtime.sendMessage).toBeCalledWith({
            command: "startStoringWebRequestPayloadSize",
            tabId: mockTabId,
        });
    });
});
