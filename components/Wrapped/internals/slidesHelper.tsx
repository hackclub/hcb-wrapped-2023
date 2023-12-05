import { WrappedData } from "../utils/data";
import $ from "@/utils/theme";
import React from "react";
import slides from "../slides";
import Stories from 'react-insta-stories';
import { Action, Story } from "react-insta-stories/dist/interfaces";
import useViewport from "../hooks/useViewport";


export interface SlideProps {
  data: WrappedData;
  action?: Action;
  isPaused?: boolean;
  config?: Story;
}

export interface SlideOptions {
  bg?: string;
  duration?: number;
  skipSlide?: (data: WrappedData) => boolean;
}

type WrappedSlideComponent = (props: SlideProps) => JSX.Element;

export type WrappedSlide = WrappedSlideComponent & { config?: SlideOptions };


export default function Slides({ data }: { data: WrappedData }) {
  const { width, height } = useViewport(true);
  const padding = 32;

  const aspectRatio = 432 / 768;

  const slideWidth = Math.min((width - padding * 2), (height - padding * 2) * aspectRatio);
  const slideHeight = slideWidth / aspectRatio;

  return (
		<Stories
      stories={slides.filter(({ config }: WrappedSlide) => !config?.skipSlide?.(data)).map((Slide: WrappedSlide) => {
        const { config } = Slide;
        return {
          content: ({ action, isPaused, config: storyConfig }) => (
            <div style={{
              background: Slide.config?.bg || "white",
              width: "100%",
              height: "100%",
              paddingTop: $.s5,
              paddingBottom: $.s4,
              paddingLeft: $.s3,
              paddingRight: $.s3
            }}>
              <Slide data={data} action={action} isPaused={isPaused} config={storyConfig as any} />
            </div>
          ),
          duration: config?.duration
        }
      })}
      defaultInterval={8_000}
      width={slideWidth}
      height={slideHeight}
      keyboardNavigation
    />
  );
}
