import { EmissionsData } from "./IEmissionsRepository";

export class EmissionsRemoteDataSource {
    async getLastCalculation(): Promise<EmissionsData> {
        try {
            const data = await chrome.storage.local.get("lastCalculation");

            if (data["lastCalculation"] === undefined) {
                const defaultCalculation: EmissionsData = {
                    bytes: 0,
                    emissions: 0,
                };

                await chrome.storage.local.set({
                    lastCalculation: JSON.stringify(defaultCalculation),
                });

                return defaultCalculation;
            }

            return JSON.parse(data["lastCalculation"]) as EmissionsData;
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async storeLastCalculation(emissionsData: EmissionsData): Promise<void> {
        try {
            await chrome.storage.local.set({
                lastCalculation: JSON.stringify(emissionsData),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
