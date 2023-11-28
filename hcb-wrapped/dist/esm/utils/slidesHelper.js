import $ from "../utils/theme";
import React from "react";
import { calculateSlideOrder } from "../slides/slides";
function continueButton(onClick) {
    return ({ children }) => {
        return (React.createElement("button", Object.assign({ onClick: onClick }, $({ marginTop: $.s4 })), children || "Continue →"));
    };
}
export default function Slides({ data }) {
    const slides = calculateSlideOrder(data);
    console.log("HERE!", React);
    debugger;
    const [slide, setSlide] = React.useState(0);
    const CurrentSlide = slides[slide];
    return (React.createElement(CurrentSlide, { data: data, Continue: continueButton(() => {
            setSlide(slide + 1);
        }) }));
}
//# sourceMappingURL=slidesHelper.js.map