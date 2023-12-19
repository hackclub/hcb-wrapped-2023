import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";
import CountUp from "react-countup";
import React from "react";

export default function HCBSection({ data }: SlideProps) {
  return (
    <div
      {...$({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-center",
        justifyContent: "center",
        height: "100%",
        paddingBottom: "80px",
        color: "white",
        textAlign: "left"
      })}
    >
      <h1
        {...$.title({
          marginBottom: $.s4,
          animate$fadeIn: {
            args: ["fromRight"],
            duration: "2s"
          }
        })}
      >
        Now let's explore the impact of the{" "}
        <CountUp
          end={data.hcb.users.total}
          duration={1.5}
          {...$.title({ fontWeight: 800 })}
          style={{fontSize: "2.5em"}}
        />{" "}
        <span style={{whiteSpace: "nowrap"}}>users across HCB</span>
      </h1>
      <h2
        {...$.title({
          marginBottom: $.s3,
          animate$fadeIn: {
            args: ["fromLeft"],
            duration: "2s"
          }
        })}
      >
        👀
      </h2>
      <Background />
    </div>
  );
}

HCBSection.config = {
  bg: $.red
} satisfies SlideOptions;
