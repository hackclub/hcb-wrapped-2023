import { WrappedData } from "../utils/data";
import $ from "../utils/theme";
import React, { useCallback, useEffect, useState } from "react";
import { generateSlidesOrder } from "../slides";
import Stories from "react-insta-stories";
import { Action, Story } from "react-insta-stories/dist/interfaces";
import useViewport from "../hooks/useViewport";

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
  bgImage?: string;
  bgPattern?: string;
  duration?: number;
  cache?: DataFunction<string[]>
  skipSlide?: DataFunction<boolean>;
}

type WrappedSlideComponent = (props: SlideProps) => JSX.Element;

export type WrappedSlide = WrappedSlideComponent & { config?: SlideOptions };

export default function Slides({ data }: { data: WrappedData }) {
  let { width, height } = useViewport(true);

  const padding = (width * 3 > height) && (width > 500) ? 120 : 0;
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

  const slides = generateSlidesOrder(data).filter(({ config }: WrappedSlide) => !config?.skipSlide?.(data));
  
  useEffect(() => {
    slides.map(async (slide) =>{
      if(slide.config.cache){
        await Promise.all(
          slide.config.cache(data).map((src: any) => {
            return new Promise((resolve, reject) => {
              const img = new Image()
              img.src = src
              img.onload = resolve
              img.onerror = reject
            })
          }),
        )
      }
    })
  }, []);

  return (
    <>
      {padding ? <button style={{ marginRight: 10 }} onClick={handlePrev}>
        &#x25C0;
      </button> : null}
      <div
        className="main"
        style={{
          transform: `scale(${scale})`,
          overflow: mobile ? undefined : "hidden"
        }}
      >
        <div className="content"></div>
        <Stories
          currentIndex={index}
          stories={slides
            .map((Slide: WrappedSlide, i: number) => {
              const { config } = Slide;
              return {
                content: ({ action, isPaused, config: storyConfig, story: {} }) => {
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
                              ? { background: Slide.config?.conditionalBg(data) } : { background: "white" }),
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
                  )
                },
                duration: config?.duration
              };
            })}
          defaultInterval={8_000}
          width={432}
          height={768}
          keyboardNavigation
        />
        {mobile && <style
            dangerouslySetInnerHTML={{
              __html: bgCSSMobile
            }}
          />}
      </div>
      {padding ? <button style={{ marginLeft: 10 }} onClick={handleNext}>
        &#x25B6;
      </button> : null}
    </>
  );
}

let bgCSSMobile = `
.bg-wrapper {
   display: none!important;
}
#main-wrapped-part {
   background: black!important;
}`
