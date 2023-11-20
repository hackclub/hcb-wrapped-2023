import data, { WrappedData } from "@/lib/data";
import $ from "@/utils/theme";
import { useMemo, useState } from "react";
import { calculateSlideOrder } from "./slides";

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
    const slides = useMemo(() => calculateSlideOrder(data), [data]);

    const [slide, setSlide] = useState(0);

    const CurrentSlide = slides[slide];

    return (
        <CurrentSlide data={data} Continue={continueButton(() => {
            setSlide(slide + 1);
        })} />
    );
  }
  