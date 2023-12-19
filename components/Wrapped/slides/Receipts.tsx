import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
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
  const naughty = data.individual.averageReceiptUploadTime > 604800 || data.individual.lostReceiptCount > 50;
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
        Receipts are important; you've got{" "}
        <span style={{color: "#095465", whiteSpace: "nowrap"}}>{data.individual.lostReceiptCount} missing</span>{" "}
        and take on average{" "}
        <span style={{color: "#095465", whiteSpace: "nowrap"}}>{formatDuration(data.individual.averageReceiptUploadTime)}</span>{" "}
        to upload them.
      </h1>
      <h2 {...$.title({ marginTop: $.s3, color: 'white',animate$fadeIn: {
        args: ["fromLeft"],
        delay: "0.1s"
      } })}><i>That's pretty {naughty ? "naughty" : "nice"} of you?</i></h2>
      <Background />
    </div>
  );
}

Receipts.config = {
  conditionalBg: (data) => data.individual.averageReceiptUploadTime > 604800 ? $.red : $.green,
  duration: 10_000
} satisfies SlideOptions;
