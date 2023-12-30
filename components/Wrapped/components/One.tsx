import React from "react";
import { WrappedData } from "../utils/data";
import { css } from "../internals/Wrapped";
import $ from "../utils/theme";
import { generateWordsUrl } from "../slides/WordCloud";
import { Content } from "../slides/ByDate";
import { formatDuration } from "../slides/Receipts";
import { prettifyCategory } from "../slides/HCBTopMerchants";
import { USDollarNoCents } from "../utils/formatter";

const OnePager = React.forwardRef((props, ref) => {
  //@ts-ignore
  const data = props.data as WrappedData;
  let location = Object.keys(
    Object.entries(data.individual.spendingByLocation)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
  )[0].split(" - ");
  const uploadTime = data.individual.averageReceiptUploadTime || 0;
  const prettyLostReceiptCount =
    data.individual.lostReceiptCount == 0
      ? "none"
      : data.individual.lostReceiptCount;
  const naughty = uploadTime > 604800 || data.individual.lostReceiptCount > 50;
  const roundTo2 = (decimal: number) =>
    Math.round((decimal + Number.EPSILON) * 100 * 100) / 100;
  const percentile = roundTo2(1 - data.individual.ranking);
  const ranking = roundTo2(data.individual.ranking);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "6.5fr 4fr 4fr",
        background: "black",
        width: "1000px",
        height: "632px",
        gap: "16px",
        padding: "16px",
        borderRadius: "16px"
      }}
      ref={ref as any}
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 2fr 6fr",
          height: "600px",
          gap: "16px"
        }}
      >
        <div
          style={{
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            padding: "16px",
            flexDirection: "column",
            background: $.red,
            color: "white"
          }}
        >
          <h1
            {...$.title({
              fontSize: "1.6em",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            })}
          >
            <img
              src="https://cloud-jlacrfopp-hack-club-bot.vercel.app/00bank_wrapped.png"
              height="36px"
            />
            Wrapped 2023 (by Hack Club)
          </h1>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            padding: "16px",
            flexDirection: "column"
          }}
        >
          <h1 {...$.title({ fontSize: "2.2em" })}>
            {data.individual.firstName} spent $
            {Math.abs(data.individual.totalMoneySpent / 100)} this year on HCB.
          </h1>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            padding: "16px",
            flexDirection: "column"
          }}
        >
          <Content data={data} />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr 1fr",
          height: "600px",
          gap: "16px"
        }}
      >
        <div
          style={{
            background: `url(${generateWordsUrl(data, "400", "600")}), white`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            borderRadius: "8px"
          }}
        ></div>
        <div
          style={{
            background: `linear-gradient(rgba(37,36,41,0.5) 0%, rgba(37,36,41,0.85) 75%), url(https://wrapped-maps.hackclub.dev/api/mega-maps?location=${encodeURIComponent(
              JSON.stringify(location)
            )})`,
            borderRadius: "8px",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            border: "2px solid white",
            fontSize: "1.8em",
            textAlign: "center",
            color: "white",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "1.2",
            padding: "8px"
          }}
        >
          They became a local hero in {location.reverse()[0]}.
        </div>
        <div
          style={{
            background:
              data.individual.averageReceiptUploadTime > 604800 ||
              data.individual.lostReceiptCount > 50
                ? $.red
                : $.green,
            borderRadius: "8px",
            padding: "16px",
            border: "2px solid white"
          }}
        >
          <h1 {...$.title({ fontSize: "1.5em", color: "white" })}>
            They've been {naughty ? "naughty" : "nice"} with their receipts;
            they've got{" "}
            <span
              style={{
                color: naughty ? "#fcbec5" : "#095465",
                whiteSpace: "nowrap"
              }}
            >
              {prettyLostReceiptCount} missing
            </span>{" "}
            {uploadTime == 0 ? null : (
              <>
                and take on average{" "}
                <span
                  style={{
                    color: naughty ? "#fcbec5" : "#095465",
                    whiteSpace: "nowrap"
                  }}
                >
                  {formatDuration(data.individual.averageReceiptUploadTime)}
                </span>{" "}
                to upload them.
              </>
            )}
          </h1>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows:
            Object.keys(data.organizations).length > 2
              ? "1fr 1fr 1fr 1fr"
              : "1fr 1fr 1fr",
          height: "600px",
          gap: "16px"
        }}
      >
        {Object.keys(data.organizations).length > 2 && (
          <div
            style={{
              borderRadius: "8px",
              background: $.purple,
              padding: "16px",
              border: "2px solid white",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h1 {...$.title({ fontSize: "1.5em", color: "white" })}>
              This year, they've been working on a lot of HCB projects,{" "}
              {Object.keys(data.organizations).length} to be exact.
            </h1>
          </div>
        )}
        <div
          style={{
            borderRadius: "8px",
            background: $.blue,
            padding: "16px",
            border: "2px solid white",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1 {...$.title({ fontSize: "1.5em", color: "white" })}>
            By spending{" "}
            {USDollarNoCents.format(
              Math.abs(
                (Object.values(
                  Object.entries(data.individual.spendingByMerchant)
                    .sort(([, a], [, b]) => b - a)
                    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
                )[0] as number) / 100
              )
            )}
            , they kept{" "}
            {
              Object.keys(
                Object.entries(data.individual.spendingByMerchant)
                  .sort(([, a], [, b]) => b - a)
                  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
              )[0]
            }{" "}
            in business this year.
          </h1>
        </div>
        <div
          style={{
            borderRadius: "8px",
            background: $.orange,
            padding: "16px",
            border: "2px solid white",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1 {...$.title({ fontSize: "1.5em", color: "white" })}>
            Their favorite type of business was{" "}
            {prettifyCategory(
              Object.keys(
                Object.entries(data.individual.spendingByCategory)
                  .sort(([, a], [, b]) => b - a)
                  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
              )[0]
            )}
            . They spent{" "}
            {USDollarNoCents.format(
              Math.abs(
                (Object.values(
                  Object.entries(data.individual.spendingByCategory)
                    .sort(([, a], [, b]) => b - a)
                    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
                )[0] as number) / 100
              )
            )}{" "}
            with them.
          </h1>
        </div>
        <div
          style={{
            borderRadius: "8px",
            background: $.yellow,
            padding: "16px",
            border: "2px solid white",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1 {...$.title({ fontSize: "1.5em", color: "white" })}>
            {data.individual.ranking <= 0.07 ? ( // Top 7% of spenders
              <>One of the top {ranking + "%"} of spenders!</>
            ) : (
              <>They spent more than {percentile + "%"} of other HCB users!</>
            )}
          </h1>
        </div>
      </div>
    </div>
  );
});

export default OnePager;
