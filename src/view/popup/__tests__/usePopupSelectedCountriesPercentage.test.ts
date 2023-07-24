import { act, renderHook } from "@testing-library/react";

import { mockChrome } from "../../../utils/test-objects/mockChrome";
import { usePopup } from "../usePopup";

(global as any).chrome = mockChrome;

describe("usePopup", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("If the sum of percentages > 100, then an error should be shown", async () => {
        const { result } = renderHook(() => usePopup());

        const mockCountry1 = "Australia";
        const mockCountry1Percentage = 101;

        await act(async () => {
            await result.current.addSelectedCountry(mockCountry1);
        });

        await act(async () => {
            await result.current.setCountryPercentage(
                mockCountry1,
                mockCountry1Percentage
            );
        });

        await act(async () => {
            await result.current.refreshAndGetSize();
        });

        expect(result.current.error).toBeDefined();
    });
});
