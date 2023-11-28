import { WrappedData } from "../utils/data";
import React from "react";
declare function continueButton(onClick: () => void): ({ children }: {
    children?: React.ReactNode;
}) => React.JSX.Element;
export interface SlideProps {
    data: WrappedData;
    Continue: ReturnType<typeof continueButton>;
}
export type WrappedSlide = (props: SlideProps) => JSX.Element;
export default function Slides({ data }: {
    data: WrappedData;
}): React.JSX.Element;
export {};
