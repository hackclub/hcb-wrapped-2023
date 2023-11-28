export type moneyCents = number;
export type date = `${number}-${number}-${number}`;
export type orgCategory = "hackathon" | "hack club" | "nonprofit" | "event" | "high school hackathon" | "robotics team" | "hardware grant" | "hack club hq" | "outernet guild" | "grant recipient" | "salary" | "ai";
export interface SpendingByLocation {
    [key: string]: {
        amount: moneyCents;
        [key: string]: string | moneyCents;
    }[] | moneyCents;
}
export interface PlatinumCard {
    organization: string;
    lastFourDigits: string;
}
export interface SpendingByCategory {
    [key: string]: number;
}
export interface SpendingByMerchant {
    [key: string]: number;
}
export interface IndividualData {
    firstName: string;
    totalMoneySpent: number;
    spendingByDate: {
        [key: date]: moneyCents;
    };
    ranking: {
        overall: number | null;
        mutuals: number | null;
        teenagers: number | null;
        adults: number | null;
    };
    averageReceiptUploadTime: number;
    lostReceiptCount: number;
    spendingByLocation: SpendingByLocation;
    platinumCard: PlatinumCard | null;
    words: string[];
    spendingByCategory: SpendingByCategory;
    spendingByMerchant: SpendingByMerchant;
}
export interface OrgData {
    individualSpent: moneyCents;
    spent: moneyCents;
    raised: moneyCents;
    spendingByDate: {
        [key: date]: moneyCents;
    };
    spendingByLocation: SpendingByLocation;
    spendingByCategory: SpendingByCategory;
    spendingByMerchant: SpendingByMerchant;
    category: orgCategory;
}
export interface HCBGrowthStat {
    total: number;
    new: number;
}
export interface SpendingByDate {
    [key: date]: moneyCents;
}
export interface HCBData {
    spent: moneyCents;
    raised: moneyCents;
    organizations: HCBGrowthStat;
    users: HCBGrowthStat;
    spendingByLocation: SpendingByLocation;
    spendingByCategory: SpendingByCategory;
    spendingByMerchant: SpendingByMerchant;
    spendingByDate: SpendingByDate;
}
export interface WrappedData {
    individual: IndividualData;
    organizations: {
        [key: string]: OrgData;
    };
    hcb: HCBData;
}
declare const _default: {
    individual: {
        firstName: string;
        totalMoneySpent: number;
        spendingByDate: {
            "01-01-2023": number;
        };
        ranking: {
            overall: number;
            mutuals: number;
            teenagers: number;
            adults: null;
        };
        averageReceiptUploadTime: number;
        lostReceiptCount: number;
        platinumCard: {
            organization: string;
            lastFourDigits: string;
        };
        words: string[];
        spendingByLocation: {
            "United States of America": {
                postal: string;
                amount: number;
            }[];
            Singapore: number;
            India: {
                city: string;
                amount: number;
            }[];
        };
        spendingByCategory: {
            "fast food": number;
            health: number;
            "buisness expenses": number;
        };
        spendingByMerchant: {
            "AMAZON.COM": number;
            "Covenant Hills Christian Campground": number;
        };
    };
    organizations: {
        hq: {
            individualSpent: number;
            category: "hack club hq";
            spent: number;
            raised: number;
            spendingByDate: {
                "01-01-2023": number;
            };
            spendingByLocation: {
                "United States of America": {
                    postal: string;
                    amount: number;
                }[];
                Singapore: number;
                India: {
                    city: string;
                    amount: number;
                }[];
            };
            spendingByCategory: {
                "fast food": number;
                health: number;
                "buisness expenses": number;
            };
            spendingByMerchant: {
                "AMAZON.COM": number;
                "Covenant Hills Christian Campground": number;
            };
        };
    };
    hcb: {
        raised: number;
        spent: number;
        organizations: {
            total: number;
            new: number;
        };
        users: {
            total: number;
            new: number;
        };
        spendingByLocation: {
            "United States of America": {
                postal: string;
                amount: number;
            }[];
            Singapore: number;
            India: {
                city: string;
                amount: number;
            }[];
        };
        spendingByCategory: {
            "fast food": number;
            health: number;
            "buisness expenses": number;
        };
        spendingByMerchant: {
            "AMAZON.COM": number;
            "Covenant Hills Christian Campground": number;
        };
        spendingByDate: {
            "01-01-2023": number;
        };
    };
};
export default _default;
export declare function generateTestOrganizations(): {
    [key: string]: OrgData;
};
export declare function generateSpendingByCategory(max: number): SpendingByCategory;
export declare function generateSpendingByMerchant(max: number): SpendingByMerchant;
export declare function generateSpendingByLocation(max: number, minCountries?: number): SpendingByLocation;
export declare function generateSpendingByDate(max: number): SpendingByDate;
export declare function generateTestData(): WrappedData;
