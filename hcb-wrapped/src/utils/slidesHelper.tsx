import { WrappedData } from "../utils/data";
import $ from "../utils/theme";
import React from "react";
import { calculateSlideOrder } from "../slides/slides";

function continueButton(onClick: () => void) {
    return ({ children }: { children?: React.ReactNode }) => {
        return (
            <button onClick={onClick} {...$({ marginTop: $.s4 })}>
                {children || "Continue →"}
            </button>
        )
    }
}

export interface SlideProps {
    data: WrappedData;
    Continue: ReturnType<typeof continueButton>;
}

export type WrappedSlide = (props: SlideProps) => JSX.Element;


export default function Slides({ data }: { data: WrappedData }) {
    const slides = calculateSlideOrder(data);

    console.log("HERE!", React);
    debugger;
    const [slide, setSlide] = React.useState(0);

    const CurrentSlide = slides[slide];

    return (
        <CurrentSlide data={data} Continue={continueButton(() => {
            setSlide(slide + 1);
        })} />
    );
  }
  