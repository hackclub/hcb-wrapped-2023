import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";
import CountUp from "react-countup";
import React from "react";
import { isEmpty } from "../slides";

export default function Hometown({ data }: SlideProps) {
  let location = Object.keys(
    Object.entries(data.individual.spendingByLocation)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
  )[0].split(" - ");
  return (
    <div
      {...$({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100%",
        paddingBottom: "80px",
        color: "white",
        textAlign: "left"
      })}
    >
      <h2
        {...$.title({
          marginBottom: $.s3,
          animate$fadeIn: {
            args: ["fromLeft"],
            duration: "2s"
          }
        })}
      >
        🗺️
      </h2>
      <h1
        {...$.title({
          marginBottom: $.s4,
          animate$fadeIn: {
            args: ["fromRight"],
            duration: "2s"
          }
        })}
      >
        Having spent{" "}
        {USDollarNoCents.format(
          Math.abs(
            (Object.values(
              Object.entries(data.individual.spendingByLocation)
                .sort(([, a], [, b]) => b - a)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
            )[0] as number) / 100
          )
        )}{" "}
        there, you've became a bit of a local hero with companies located in{" "}
        {location.reverse()[0]}.
      </h1>
      <Background />
    </div>
  );
}

Hometown.config = {
  duration: 8_000,
  conditionalBgImage: (data) => {
    let location = Object.keys(
      Object.entries(data.individual.spendingByLocation)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    )[0].split(" - ");
    return `linear-gradient(rgba(37,36,41,0.5) 0%, rgba(37,36,41,0.85) 75%), url(https://wrapped-maps.hackclub.dev/api/mega-maps?location=${encodeURIComponent(
      JSON.stringify(location)
    )})`;
  },
  cache: (data) => {
    let location = Object.keys(
      Object.entries(data.individual.spendingByLocation)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    )[0].split(" - ");
    return [
      `https://wrapped-maps.hackclub.dev/api/mega-maps?location=${encodeURIComponent(
        JSON.stringify(location)
      )}`
    ];
  },
  skipSlide: (data) =>
    isEmpty(data.individual.spendingByLocation) ||
    Math.abs(
      (Object.values(
        Object.entries(data.individual.spendingByLocation)
          .sort(([, a], [, b]) => b - a)
          .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
      )[0] as number) / 100
    ) < 200
} satisfies SlideOptions;
