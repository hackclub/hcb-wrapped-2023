import $ from "@/utils/theme";
import React from "react";
import CountUp from "react-countup";

export default function HCBStat({
  data,
  label,
  background,
  isNumber = false,
  prefix = ""
}: {
  data: string | number;
  label: string;
  background?: string;
  isNumber?: boolean;
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
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
      })}
    >
      {isNumber ? (
        <CountUp
          end={Number(data.toString().replace("$", "").replace(",", ""))}
          duration={1.5}
          {...$.title({ fontWeight: 800 })}
          prefix={prefix}
        />
      ) : (
        <h2 {...$.title({ fontWeight: 800 })}>{data}</h2>
      )}
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
    </div>
  );
}
