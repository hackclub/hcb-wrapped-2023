/**
 * Contributors: This is a template slide. You can copy and
 * paste this into a new file in the slides folder to have
 * all of the helpers and types imported
 */

import $ from "@/utils/theme";
// 
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";

export default function TemplateSlide({ data }: SlideProps) {
  return (
    <>
      <h1
        {...$.title({
          // You can apply classes by daisy-chaining them after the $
          // In this case, the title class is applied
          textTransform: "uppercase"
          // You can then add CSS properties like you
          // normally would inside of this object
        })}
      >Template Slide</h1>
    </>
  );
}

TemplateSlide.config = {
/**
 * You can configure the background, slide duration, and more
 * using the config object
 */
  bg: $.blue,
  duration: 5_000 // 5 seconds
} satisfies SlideOptions