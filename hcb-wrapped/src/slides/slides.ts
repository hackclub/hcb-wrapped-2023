import type { WrappedData } from "../utils/data";
import type { WrappedSlide } from "../utils/slidesHelper";

import StartSlide from "./Start";
import HCBSlide from "./HCB";

export const calculateSlideOrder = (data: WrappedData): WrappedSlide[] => {
    data;
    return [
        StartSlide,
        HCBSlide
    ];
}
