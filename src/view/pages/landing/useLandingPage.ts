import {
    RecordingContext,
    RecordingContextType,
} from "../../provider/recording/RecordingProvider";
import {
    RouterContext,
    RouterContextType,
} from "../../provider/router/RouterProvider";
import { useNullSafeContext } from "../../provider/useNullSafeContext";

export const useLandingPage = () => {
    const { startRecording } =
        useNullSafeContext<RecordingContextType>(RecordingContext);

    const { goToPage } = useNullSafeContext<RouterContextType>(RouterContext);

    const onRecordButtonPress = async () => {
        if (await startRecording()) {
            goToPage("recording");
        }
    };

    return {
        onRecordButtonPress,
    };
};
