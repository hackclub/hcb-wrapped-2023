import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";

export default function HelloWorld({ data }: SlideProps) {
  return (
    <>
      <h2 {...$.title({ marginBottom: $.s3 })}>🏦 🎁 🎉</h2>
      <h1 {...$.title()}>
        <span {...$({ color: "var(--red)" })}>Hello</span>, World!
      </h1>
      <Background />
    </>
  );
}

HelloWorld.config = {
    bg: $.red
} satisfies SlideOptions;