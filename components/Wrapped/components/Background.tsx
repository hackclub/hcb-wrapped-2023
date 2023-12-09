import $ from "@/utils/theme";
import React from "react";

export default function Background({
  mobileCss,
  desktopCss,
  desktopPatternImage
}: {
  mobileCss?: string;
  desktopCss?: string;
  desktopPatternImage?: string;
}) {
  desktopCss =
    desktopCss ||
    `
    background: url("${
      desktopPatternImage
        ? desktopPatternImage
        : "https://cloud-ppjsbwxdm-hack-club-bot.vercel.app/0secretfreeze.svg"
    }"), linear-gradient(rgba(5,0,0,0.10), rgba(5,0,0,0.10));
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
  `;
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          div.bg {
            ${desktopCss}
          }`
      }}
    />
  );
}
