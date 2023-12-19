import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";
import CountUp from "react-countup";
import { prettifyCategory } from "./HCBTopMerchants";
import React from "react";

function formatDuration(seconds: number) {
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  if (seconds < minute) {
    return seconds + (seconds === 1 ? ' second' : ' seconds');
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return minutes + (minutes === 1 ? ' minute' : ' minutes');
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    const hoursStr = hours + (hours === 1 ? ' hour' : ' hours');
    return hoursStr;
  } else {
    const days = Math.floor(seconds / day);
    const daysStr = days + (days === 1 ? ' day' : ' days');
    return daysStr;
  }
}

export default function Receipts({ data }: SlideProps) {
  const roundTo2 = (decimal: number) =>
    Math.round((decimal + Number.EPSILON) * 100 * 100) / 100;
  const percentile = roundTo2(1 - data.individual.ranking);
  const ranking = roundTo2(data.individual.ranking);
  const naughty = data.individual.averageReceiptUploadTime > 604800
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
      <h2 {...$.title({ marginBottom: $.s3 })}>📃</h2>
      <h1 {...$.title({ marginBottom: $.s4, fontSize: "2.8em", color: 'white' })}>
        Receipts are important; you've got {data.individual.lostReceiptCount} missing and take on average {formatDuration(data.individual.averageReceiptUploadTime)} days to upload each of them.
      </h1>
      <h2 {...$.title({ marginTop: $.s3, color: 'white' })}><i>That's pretty {naughty ? "naughty" : "nice"} of you?</i></h2>
      <Background />
    </div>
  );
}

Receipts.config = {
  conditionalBg: (data) => data.individual.averageReceiptUploadTime > 604800 ? $.red : $.green,
  duration: 10_000
} satisfies SlideOptions;
