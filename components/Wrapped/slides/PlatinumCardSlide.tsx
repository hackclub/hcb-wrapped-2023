import $ from "../utils/theme";
import React from "react";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";

export default function PlatinumCardSlide({ data }: SlideProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: $.s2,
        height: "100%"
      }}
    >
      <h1
        {...$.title({
          color: "white",
          marginBottom: $.s4
        })}
      >
        On the first day of April, you  earned yourself a one-of-a-kind exclusive HCB Platinum Card. <i>April Fools?</i>
      </h1>

      <div
        {...$({
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "auto",
          animate$fadeIn: {
            args: ["fromBottom"],
            delay: "0.5s"
          }
        })}
      >
        <div className="platinum-card">
          <div
            style={{
              opacity: "50%",
              right: "10px",
              top: "10px",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {" "}
            <img
              src="https://icons.hackclub.com/api/icons/0x737A82/bank-account"
              style={{ maxHeight: 28 }}
            />
            <p
              style={{
                margin: 0,
                padding: 0,
                lineHeight: 1,
                fontSize: 16,
                letterSpacing: 2
              }}
            >
              PLATINUM
            </p>
          </div>
          <p className="stripe-card__number fs-mask">
            •••• •••• •••• {data.individual.platinumCard?.lastFourDigits}
          </p>
          <p
            style={{
              display: "flex",
              justifyItems: "flex-end",
              alignItems: "center",
              textTransform: "none",
              marginTop: 0,
              marginBottom: 0
            }}
          >
            <span style={{ fontWeight: "bold" }}>{data.individual.name}</span>
          </p>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: css
        }}
      />
      <Background />
    </div>
  );
}

const css = `
  .platinum-card {
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    width: 22.75rem;
    height: 14rem;
    padding: 1.5rem;
    position: relative;
    background-repeat: no-repeat;
    /* 120% to account for z-axis perspective */
    background-size: 120%;
    font-size: 1.25rem;
    text-align: left;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
    transition: 0.25s ease-out transform;
    transform: scale(1);
    transform-style: preserve-3d;
    background: linear-gradient(
        to bottom right,
        #808080,
        #ffffff 80%,
        #808080
    ) !important;
    color: rgba(0, 0, 0, 0.4);
    font-family: sans-serif;
  }
`

PlatinumCardSlide.config = {
  bg: $.blue,
  duration: 8000, // 8 seconds
  skipSlide: (data) => data.individual.platinumCard == undefined
} satisfies SlideOptions;
