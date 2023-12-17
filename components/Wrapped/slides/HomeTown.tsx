import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";
import CountUp from "react-countup";

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
            args: ["fromTop"],
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
            args: ["fromBottom"],
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
        there, you've became a bit of a local hero in{" "}
        {location[2]
          ? location[2] == "000000"
            ? location.slice(0, 2).reverse().join(", ")
            : location.reverse().join(", ")
          : location[1] == "000000"
            ? location.slice(0, 1).reverse().join(", ")
            : location.reverse().join(", ")}
        .
      </h1>
      <Background />
    </div>
  );
}

Hometown.config = {
  bg: $.yellow,
  duration: 8_000,
  skipSlide: (data) => Math.abs(
  (Object.values(
    Object.entries(data.individual.spendingByLocation)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
  )[0] as number) / 100) < 200
} satisfies SlideOptions;
