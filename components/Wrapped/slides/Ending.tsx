import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";
// @ts-ignore
import ConfettiGenerator from "confetti-js";
import React, { useEffect } from "react";

export default function Ending({ data }: SlideProps) {
  useEffect(() => {
    const confettiSettings = { target: "confetti", max: 900, clock: 100 };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, []); // add the var dependencies or not
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingBottom: "30px",
          color: "white"
        }}
      >
        <h1
          {...$.headline({
            fontSize: "3.3em",
            marginTop: "0px",
            color: "white",
            textAlign: "center",
            marginBottom: $.s2
          })}
        >
          That was fun, thank you for joining us!
        </h1>
        <p
          {...$.subtitle({
            color: "white",
            textAlign: "center",
            marginTop: $.s2,
            fontStyle: "italic"
          })}
        >
          See you again next year?
        </p>
        <Background />
      </div>
      <canvas
        id="confetti"
        style={{ height: "100%", position: "absolute", top: 0 }}
      ></canvas>
    </>
  );
}

Ending.config = {
  bgImage: `linear-gradient(rgba(37,36,41,0.5) 0%, rgba(37,36,41,0.85) 75%), url(https://cloud-qsamaseg5-hack-club-bot.vercel.app/0bmc_1372-min.jpg)`,
  cache: (data) => ["https://cloud-qsamaseg5-hack-club-bot.vercel.app/0bmc_1372-min.jpg"],
  duration: 3000
} satisfies SlideOptions;
