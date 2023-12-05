import $ from "@/utils/theme";
//
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";

export default function WordCloud({ data }: SlideProps) {
  return (
    <>
      <h1 {...$.title({ marginBottom: $.s3 })} >Words!</h1>
      <Background />
    </>
  );
}

WordCloud.config = {
  bg: $.white,
  duration: 5_000, // 5 seconds
  skipSlide: () => false
} satisfies SlideOptions;
