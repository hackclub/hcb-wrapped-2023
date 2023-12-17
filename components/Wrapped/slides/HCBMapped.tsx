import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";

export default function HCBMapped({ data }: SlideProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingBottom: "30px"
        }}
      >
        <h1
          {...$.headline({ fontSize: "2em", marginTop: "0px", color: "white" })}
        >
          We spent from coast to coast.
        </h1>
        <img src="https://cloud-qtfpd6kdn-hack-club-bot.vercel.app/0amount.png" />
        <Background />
      </div>
    </>
  );
}

HCBMapped.config = {
  bg: $.white,
} satisfies SlideOptions;
