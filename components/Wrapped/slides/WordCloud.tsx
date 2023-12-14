import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";

export default function WordCloud({ data }: SlideProps) {
  return (
    <>
      <h2 {...$.headline({ marginBottom: $.s3 })} id="input">
        You used lots of
      </h2>
      <h1>
        <span {...$.title({ color: $.red })}>w</span>
        <span {...$.title({ color: $.orange })}>o</span>
        <span {...$.title({ color: $.yellow })}>r</span>
        <span {...$.title({ color: $.green })}>d</span>
        <span {...$.title({ color: $.blue })}>s</span>
        <span {...$.title({ color: $.purple })}>!</span>
      </h1>
      <img
        src={
          "https://quickchart.io/wordcloud" +
          "?text=" +
          data.individual.words.join(",") +
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
          "&width=400" +
          "&height=600" +
          "&fontFamily=sans-serif" +
          "&fontScale=50"
        }
      />
      <Background />
    </>
  );
}

WordCloud.config = {
  bg: $.white,
  duration: 8_000, // 8 seconds
  skipSlide: () => false
} satisfies SlideOptions;
