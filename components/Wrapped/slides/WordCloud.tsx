import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import React from "react";
import { WrappedData } from "../utils/data";

export function generateWordsUrl(data: WrappedData, width = "400", height = "580") {
  const words = data.individual.words
    // Remove symbols because Quick Chart's word cloud don't render them
    .map((word) => word.replaceAll(/[.,:-_#\/\\]/g, ""))
    // Remove empty words and words that are only numbers
    .filter((word) => word.length > 0 && !parseInt(word))
    // URL encode the words
    .map((word) => encodeURIComponent(word));

  return (
    "https://quickchart.io/wordcloud" +
    "?text=" +
    words.join(",") +
    "&colors=" +
    encodeURIComponent(
      JSON.stringify(
        `#ec3750
#ff8c37
#f1c40f
#33d6a6
#5bc0de
#338eda
#a633d6`.split("\n")
      )
    ) +
    "&useWordList=true" +
    "&width=" + width +
    "&height=" + height +
    "&fontFamily=" +
    encodeURIComponent("system-ui, sans-serif") +
    "&fontScale=50"
  );
}
export default function WordCloud({ data }: SlideProps) {
  return (
    <>
      <div {...$({animate$fadeIn: {
          args: ["fromTop"]
        }})}>
        <h2
          {...$.headline({
            textAlign: "center",
            fontSize: 25
          })}
          id="input"
        >
          You used lots of
        </h2>
      </div>
      <div
        {...$({
          marginTop: -22,
          marginBottom: 8,
          textAlign: "center",
          textTransform: 'uppercase',
          animate$fadeIn: {
            args: ["fromBottom"]
          }
        })}
      >
        <h1>
          <span {...$.title({ color: $.red, fontSize: 65 })}>w</span>
          <span {...$.title({ color: $.orange, fontSize: 65 })}>o</span>
          <span {...$.title({ color: $.yellow, fontSize: 65 })}>r</span>
          <span {...$.title({ color: $.green, fontSize: 65 })}>d</span>
          <span {...$.title({ color: $.blue, fontSize: 65 })}>s</span>
          <span {...$.title({ color: $.purple, fontSize: 65 })}>!</span>
        </h1>
      </div>
      <img
        src={
          generateWordsUrl(data)
        }
        {...$({animate$fadeIn: {
            args: ["fromBottom"]
          }})}
      />
      <Background />
    </>
  );
}

WordCloud.config = {
  bg: $.white,
  duration: 8_000, // 8 seconds
  skipSlide: (data) => data.individual.words.length === 0,
  cache: data => [generateWordsUrl(data)]
} satisfies SlideOptions;
