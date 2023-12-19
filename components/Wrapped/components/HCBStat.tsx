import $ from "../utils/theme";
import React from "react";
import CountUp from "react-countup";

export default function HCBStat({
  data,
  topLabel,
  label,
  background,
  isNumber = false,
  fontSize = "",
  prefix = ""
}: {
  data: string | number;
  label?: string;
  topLabel?: string;
  background?: string;
  isNumber?: boolean;
  fontSize?: string;
  prefix?: string;
}) {
  return (
    <div
      {...$({
        background: background || $.sunken,
        borderRadius: "12px",
        padding: `${$.s3} ${$.s4}`,
        textTransform: "uppercase",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
      })}
    >
      {topLabel && (
        <div {...$({ display: "flex", alignItems: "center", gap: "4px" })}>
          <b
            {...$({
              fontSize: "0.7em",
              fontWeight: 800
            })}
          >
            {topLabel}
          </b>
        </div>
      )}
      {isNumber ? (
        <CountUp
          end={Number(data.toString().replace("$", "").replace(",", ""))}
          duration={1.5}
          {...$.title({ fontWeight: 800 })}
          prefix={prefix}
        />
      ) : (
        <h2
          {...$.title({
            fontWeight: 800,
            fontSize,
            overflowWrap: "anywhere"
          })}
        >
          {data}
        </h2>
      )}
      {label && (
        <div {...$({ display: "flex", alignItems: "center", gap: "4px" })}>
          <b
            {...$({
              fontSize: "0.7em",
              fontWeight: 800
            })}
          >
            {label}
          </b>
        </div>
      )}
    </div>
  );
}
