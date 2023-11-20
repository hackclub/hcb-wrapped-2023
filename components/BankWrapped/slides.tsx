import type { WrappedData } from "@/lib/data";
import type { WrappedSlide } from "./slidesHelper";

import StartSlide from "./slides/Start";
import HCBSlide from "./slides/HCB";

export const calculateSlideOrder = (data: WrappedData): WrappedSlide[] => {
    return [
        StartSlide,
        HCBSlide
    ];
}
