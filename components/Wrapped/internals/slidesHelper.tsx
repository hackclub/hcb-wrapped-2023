import { WrappedData } from "../utils/data";
import $ from "../utils/theme";
import React, { useCallback, useEffect, useState } from "react";
import { generateSlidesOrder } from "../slides";
import Stories from "react-insta-stories";
import { Action, Story } from "react-insta-stories/dist/interfaces";
import useViewport from "../hooks/useViewport";
import Icon from "@hackclub/icons";
import OnePager from "../components/One";
import { useToPng } from "@hugocxl/react-to-image";

export interface SlideProps {
  data: WrappedData;
  action?: Action;
  isPaused?: boolean;
  config?: Story;
}

type DataFunction<T> = (data: WrappedData) => T;

export interface SlideOptions {
  bg?: string;
  conditionalBg?: (data: WrappedData) => string;
  conditionalBgImage?: (data: WrappedData) => string;
  bgImage?: string;
  bgPattern?: string;
  duration?: number;
  cache?: DataFunction<string[]>;
  skipSlide?: DataFunction<boolean>;
}

type WrappedSlideComponent = (props: SlideProps) => JSX.Element;

export type WrappedSlide = WrappedSlideComponent & { config?: SlideOptions };

export default function Slides({ data }: { data: WrappedData }) {
  let { width, height } = useViewport(true);

  const padding = width * 3 > height && width > 500 ? 120 : 0;
  width -= padding;
  height -= padding;
  const ratio = width / height;
  const scale = ratio > 9 / 16 ? height / 768 : width / 432;

  const mobile = padding == 0;

  const [index, setIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setIndex((i) => i - 1);
  }, [setIndex]);

  const handleNext = useCallback(() => {
    setIndex((i) => i + 1);
  }, [setIndex]);

  const slides = generateSlidesOrder(data).filter(
    ({ config }: WrappedSlide) => !config?.skipSlide?.(data)
  );

  const [_, convert, ref] = useToPng<HTMLDivElement>({
    quality: 0.8, //@ts-ignore
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = data;
      link.click();
    }
  });

  useEffect(() => {
    slides.map(async (slide) => {
      if (slide.config.cache) {
        await Promise.all(
          slide.config.cache(data).map((src: any) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              console.log(src);
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
      }
    });
  }, []);

  return (
    <>
      {padding ? (
        <button
          style={{ marginRight: 10, height: "50px", width: "50px" }}
          onClick={handlePrev}
        >
          &#x25C0;
        </button>
      ) : null}
      <div>
        <div
          className="main"
          style={{
            transform: `scale(${scale})`,
            overflow: mobile ? undefined : "hidden"
          }}
        >
          <Stories
            currentIndex={index}
            stories={slides.map((Slide: WrappedSlide, i: number) => {
              const { config } = Slide;
              return {
                content: ({
                  action,
                  isPaused,
                  config: storyConfig,
                  story: {}
                }) => {
                  useEffect(() => {
                    if (isPaused && i != slides.length - 1) {
                      // @ts-ignore
                      window.__wrapped_audio?.pause?.();
                    } else {
                      // @ts-ignore
                      window.__wrapped_audio?.play?.();
                    }
                  }, [isPaused]);

                  return (
                    <div
                      style={{
                        ...(Slide.config?.bg
                          ? { background: Slide.config?.bg }
                          : Slide.config?.bgImage
                            ? {
                                backgroundImage: Slide.config?.bgImage,
                                backgroundSize: "cover",
                                backgroundPosition: "center bottom"
                              }
                            : Slide.config?.bgPattern
                              ? {
                                  background: $.darkless,
                                  backgroundSize: "5px",
                                  backgroundImage: Slide.config?.bgPattern
                                }
                              : Slide.config?.conditionalBg
                                ? {
                                    background:
                                      Slide.config?.conditionalBg(data)
                                  }
                                : Slide.config?.conditionalBgImage
                                  ? {
                                      background:
                                        Slide.config?.conditionalBgImage(data),
                                      backgroundSize: "cover",
                                      backgroundPosition: "center bottom"
                                    }
                                  : { background: "white" }),
                        width: "100%",
                        height: "100%",
                        paddingTop: $.s5,
                        paddingBottom: $.s4,
                        paddingLeft: $.s3,
                        paddingRight: $.s3
                      }}
                    >
                      <Slide
                        data={data}
                        action={action}
                        isPaused={isPaused}
                        config={storyConfig as any}
                      />
                    </div>
                  );
                },
                duration: config?.duration
              };
            })}
            defaultInterval={8_000}
            width={432}
            height={768}
            onStoryStart={(index: number) => setIndex(index)}
            keyboardNavigation
          />
          {mobile && (
            <style
              dangerouslySetInnerHTML={{
                __html: bgCSSMobile
              }}
            />
          )}
        </div>
      </div>
      {padding ? (
        !(index == slides.length - 1) ? (
          <button
            style={{ marginLeft: 10, height: "50px", width: "50px" }}
            onClick={handleNext}
          >
            &#x25B6;
          </button>
        ) : (
          <>
            <button
              style={{
                marginLeft: 10,
                height: "50px",
                width: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px"
              }}
              onClick={convert}
            >
              <Icon glyph="download" size={50} />
            </button>
            <div
              style={{
                top: 0,
                left: 0,
                opacity: 0,
                display: "none"
              }}
            >
              <OnePager ref={ref} {...{ data: data }} />
            </div>
          </>
        )
      ) : null}
    </>
  );
}

let bgCSSMobile = `
.bg-wrapper {
   display: none!important;
}
#main-wrapped-part {
   background: black!important;
}`;
