import { WrappedData } from "../utils/data";
import $ from "@/utils/theme";
import React from "react";
import slides from "../slides";
import Stories from 'react-insta-stories';
import { Action, Story } from "react-insta-stories/dist/interfaces";


export interface SlideProps {
  data: WrappedData;
}

export interface SlideOptions {
  bg?: string;
  duration?: number;
}

type WrappedSlideComponent = (props: SlideProps) => JSX.Element;

export type WrappedSlide = WrappedSlideComponent & { config?: SlideOptions };


export default function Slides({ data }: { data: WrappedData }) {
  console.log("HERE!", React);
  debugger;
  const [slide, setSlide] = React.useState(0);

  const CurrentSlide = slides[slide];

  return (
    // <CurrentSlide
    //   data={data}
    //   Continue={function () {
    //     return <>hi</>
    //   }}
    // />

		<Stories
      stories={slides.map((Slide: WrappedSlide) => {
        const { config } = Slide;

        return {
          content: ({ action, isPaused, config: storyConfig }) => (
            <div style={{
              background: Slide.config?.bg || "white",
              width: "100%",
              height: "100%",
            }}>
              <Slide data={data} />
            </div>
          ),
          duration: config?.duration
        }
      })}
      defaultInterval={8_000}
      width={432}
      height={768}
      keyboardNavigation
    />
  );
}
