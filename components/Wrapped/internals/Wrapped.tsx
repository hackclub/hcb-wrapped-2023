/** === === === === === === === === === === === === **\
 * This is an internal component that manages the    *
 * core utilities of Wrapped. Changes and updates to *
 * this component are welcome, but they may impact   *
 * the work of other slides and other contributors.  *
\** === === === === === === === === === === === === **/

import { WrappedData } from "../utils/data";
import $ from "@/utils/theme";
import Slides from "./slidesHelper";
import React from "react";

export default function HcbWrapped({ data }: { data: WrappedData }) {
  return (
    <>
      <div
        {...$({
          margin: "0px",
          padding: "0px",
          height: "100svh",
          width: "100vw",
          zIndex: "19",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        })}
      >
        <div className="main">
          <div className="content">
            <Slides data={data} />
          </div>
        </div>
        <div className="footer">
          <div className="inner-footer">
            <p>
              Bank Wrapped 2023<span style={{ whiteSpace: "pre" }}> | </span>
              <a href="https://hackclub.com/hcb" target="_blank">
                Hack Club HCB
              </a>
              <span style={{ whiteSpace: "pre" }}> | </span>
              <a
                href="https://github.com/hackclub/hcb-wrapped-2023"
                target="_blank"
              >
                Source Code
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-wrapper">
        <div className="bg"></div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: css
        }}
      />
    </>
  );
}

const css = `
    * {
        box-sizing: border-box;
    }

    html, body, div.wrapper, div.bg-wrapper {
        margin: 0px;
        padding: 0px;
        height: 100svh;
        width: 100vw;
    }

    div.bg-wrapper {
        position: absolute;
        z-index: 4;
        top: 0px;
        left: 0px;
        overflow: hidden;
    }

    body {
        background: var(--red);
    }

    div.wrapper {
        z-index: 19;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.main {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        box-shadow: 0px 0px 20px 0px #3403095e;
        position: relative;
        top: 0px;
        left: 0px;
        z-index: 22;
    }

    .tx-details {
        display: inline-flex;
    }

    @media screen and (max-width: 600px) {
        .tx-details {
            display: none;
        }
    }

    div.content {
        text-align: center;
        cursor: default;
        max-width: 100%;
    }

    div.bg {
        background: url("https://cloud-ppjsbwxdm-hack-club-bot.vercel.app/0secretfreeze.svg");
        background-repeat: space;
        background-size: 80px 80px;
        color: white;
        z-index: 5;
        position: absolute;
        top: 0px;
        width: 800vw;
        height: 800vh;
        left: 0px;
        transform: rotate(20deg) translate(-25%, -25%);
    }

    div.footer {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        padding: var(--spacing-3);
        text-align: center;
        color: white;
        z-index: 20;
    }

    div.inner-footer {
        background: #ec374f92;
        display: inline-block;
        box-shadow: 0px 0px 40px 0px #ec374f92;
        padding: 16px;
        position: relative;
        top: 0px;
        left: 0px;
        z-index: 21;
    }

    div.inner-footer * {
        color: white;
    }

    div.progress {
        width: 100%;
        height: 32px;
        border: 4px solid var(--smoke);
        background: var(--snow);
        border-radius: 16px;
    }

    div.progress > div.meter {
        height: 100%;
        background: var(--red);
        --color-1: #ec3750;
        --color-2: #a72032;
        background-position-x: 10px;
        --width: 20px;
        background: repeating-linear-gradient(110deg, #ec3750 calc(var(--offset) + 0px), #ec3750 calc(var(--offset) + var(--width)), #cb2b41 calc(var(--offset) + var(--width)), #cb2b41 calc(var(--offset) + calc(var(--width) * 2)));
        width: min(max(calc(var(--value) * 100%), 60px), 100%);
        transition: width 0.5s;
        border-radius: 16px;
        color: white;
        font-size: 10px;
    }

    .dev div.progress > div.meter {
        background: repeating-linear-gradient(110deg, #26c696 calc(var(--offset) + 0px), #26c696 calc(var(--offset) + var(--width)), #13a67a calc(var(--offset) + var(--width)), #13a67a calc(var(--offset) + calc(var(--width) * 2)));
    }

    div.meter > p {
        color: white;
        vertical-align: top;
        display: inline-block;
        margin: 0px;
        padding: 0px;
        font-size: 18px;
        font-weight: bold;
    }

    .transition-in {
        opacity: 0;
        position: relative;
        top: 0px;
        left: -50px;
        transition: all 0.6s;
    }

    .transition-in.transitioned-in {
        top: 0px;
        left: 0px;
        opacity: 1;
    }

    .transition-in.transitioned-out {
        top: 0px;
        left: 50px;
        opacity: 0;
    }
`;
