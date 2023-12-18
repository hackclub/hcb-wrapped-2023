import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import type {
  OrgData,
  WrappedData,
  SpendingByDate,
  date
} from "@/components/Wrapped/utils/data";
import { prettifyCategory } from "./HCBTopMerchants";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";
import Background from "../components/Background";

function findMonthWithMaxAbsoluteSum(data: SpendingByDate) {
  let monthSums: { [key: string]: number } = {};
  for (let date in data) {
    if (data.hasOwnProperty(date)) {
      let monthKey = date.substring(0, 7);
      if (!monthSums[monthKey]) {
        monthSums[monthKey] = 0;
      }
      monthSums[monthKey] += Math.abs(data[date as date]);
    }
  }
  let maxMonth = Object.keys(monthSums).reduce((a, b) =>
    monthSums[a] > monthSums[b] ? a : b
  );
  return new Date(maxMonth + "-01").toLocaleString("default", {
    month: "long"
  });
}

export default function OrgDetails({
  data,
  organization
}: {
  data: WrappedData;
  organization: OrgData & { name: string };
}) {
  let location = Object.keys(
    Object.entries(organization.spendingByLocation)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
  )[0].split(" - ");

  const backgrounds = [$.blue, $.green, $.orange, $.red];

  const shuffledBackgrounds = backgrounds.sort(() => Math.random() - 0.5);

  const gridItems = [
    <HCBStat
      data={
        Object.keys(
          Object.entries(organization.spendingByMerchant)
            .sort(([, a], [, b]) => b - a)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
        )[0]
      }
      label={`raked in a lot of cash (${USDollarNoCents.format(
        Math.abs(
          (Object.values(
            Object.entries(organization.spendingByMerchant)
              .sort(([, a], [, b]) => b - a)
              .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
          )[0] as number) / 100
        )
      )}) from ${organization.name}`}
      background={shuffledBackgrounds[0]}
    />,
    <HCBStat
      topLabel="Certain people might say you spend too much on..."
      data={prettifyCategory(
        Object.keys(
          Object.entries(organization.spendingByCategory)
            .sort(([, a], [, b]) => b - a)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
        )[0]
      )}
      label={`... but they're wrong. Those ${USDollarNoCents.format(
        Math.abs(
          (Object.values(
            Object.entries(organization.spendingByCategory)
              .sort(([, a], [, b]) => b - a)
              .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
          )[0] as number) / 100
        )
      )} were justified.`}
      background={shuffledBackgrounds[1]}
    />,
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        width: "100%"
      }}
    >
      <HCBStat
        data={
          organization.name +
          " was very busy in " +
          findMonthWithMaxAbsoluteSum(organization.spendingByDate)
        }
        background={shuffledBackgrounds[2]}
        fontSize={"1.3em"}
      />
      <HCBStat
        data={USDollarNoCents.format(
          organization.spendingByUser[data.individual.id] / 100
        )}
        label={`...you spent a fair bit for ${organization.name}`}
        background={shuffledBackgrounds[3]}
        fontSize={"2.4em"}
      />
    </div>,
    <div
      style={{
        backgroundImage: `url(https://wrapped-maps.hackclub.dev/api/maps?location=${encodeURIComponent(
          JSON.stringify(location)
        )})`,
        backgroundSize: "cover",
        minHeight: "120px",
        backgroundPosition: "center",
        width: "100%",
        borderRadius: "12px",
        position: "relative"
      }}
    >
      <div
        style={{
          background: $.dark,
          color: $.white,
          borderRadius: "4px",
          position: "absolute",
          top: 8,
          left: 8,
          padding: "4px 8px",
          fontSize: "0.8em",
          fontWeight: 800
        }}
      >
        {organization.name}'s Spending Town
      </div>
    </div>
  ];

  const shuffledGridItems = gridItems.sort(() => Math.random() - 0.5);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        paddingBottom: "80px",
        color: "black",
        textAlign: "center",
        gap: 10,
        width: "100%"
      }}
    >
      <h1
        {...$.title({
          animation: "fadeIn 1s",
          width: "100%",
          marginTop: "24px",
          color: "white",
          marginBottom: $.s2
        })}
      >
        {organization.name}
      </h1>
      {shuffledGridItems}
      <Background />
    </div>
  );
}
