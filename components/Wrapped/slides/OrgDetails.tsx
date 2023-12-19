// @ts-nocheck

import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import type {
  OrgData,
  WrappedData,
  SpendingByDate,
  date
} from "../utils/data";
import { prettifyCategory } from "./HCBTopMerchants";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";
import Background from "../components/Background";
import shuffle from "fast-shuffle";
import React from "react";

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

function deterministicShuffle(seed: string, array: any[]) {
  let intSeed = 0;
  for (let i = 0; i < seed.length; i++) {
    intSeed += seed.charCodeAt(i);
  }

  const shuffler = shuffle(intSeed);
  return shuffler(array);
}

export default function OrgDetails({
  data,
  organization,
  position
}: {
  data: WrappedData;
  organization: OrgData & { name: string };
  position: number;
}) {
  let location = Object.keys(
    Object.entries(organization.spendingByLocation)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
  )[0].split(" - ");
  
  let copy = {
    merchant: [
      (amount: string) => `raked in a lot of cash (${amount}) from ${organization.name}`,
      (amount: string) => `was ${organization.name}'s #1 merchant (${amount})`,
      (amount: string) => `was your team's favorite store (${amount})`
    ],
    categoryTop: [
      () => 'Your team spent a lot on',
      () => 'Certain people might say you all spend too much on',
      () => `Your #1 spending category was:`
    ],
    categoryBottom: [
      (amount: string) => `${amount} to be exact. Too much?`,
      (amount: string) => `but they're wrong. Those ${amount} were justified.`,
      (amount: string) => `Yall spent ${amount} with them!`
    ],
    month: [
      (month: string) => organization.name + " was very busy in " + month,
      (month: string) => `Your team spent & raised the most in ${month}.`,
      (month: string) => `Everything was happening in ${month}, it was your busiest.`
    ],
    youSpent: [
      () => `...you spent a fair bit for ${organization.name}`,
      () => `That's the total you spent on ${organization.name}!`,
      () => `All that spent by you for ${organization.name}.`
    ]
  }

  const backgrounds = [$.blue, $.green, $.orange, $.red];

  const shuffledBackgrounds = deterministicShuffle(organization.name, backgrounds);

  type Edge = "top" | "bottom";
  type GridItem = (edges: Edge[]) => JSX.Element

  const gridItems: GridItem[] = [
    edges => <HCBStat
      data={
        Object.keys(
          Object.entries(organization.spendingByMerchant)
            .sort(([, a], [, b]) => b - a)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
        )[0]
      }
      label={copy.merchant[position](USDollarNoCents.format(
        Math.abs(
          (Object.values(
            Object.entries(organization.spendingByMerchant)
              .sort(([, a], [, b]) => b - a)
              .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
          )[0] as number) / 100
        )
      ))}
      background={shuffledBackgrounds[0]}
      style$={{
        animate$fadeIn: {
          args: edges.includes("bottom") ? ["fromBottom"] : ["fromRight"],
          duration: "1s",
          delay: "150ms"
        }
      }}
    />,
    edges => <HCBStat
      topLabel={copy.categoryTop[position]()}
      data={prettifyCategory(
        Object.keys(
          Object.entries(organization.spendingByCategory)
            .sort(([, a], [, b]) => b - a)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
        )[0]
      )}
      label={copy.categoryBottom[position](USDollarNoCents.format(
          Math.abs(
            (Object.values(
              Object.entries(organization.spendingByCategory)
                .sort(([, a], [, b]) => b - a)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
            )[0] as number) / 100
          )
        ))}
      background={shuffledBackgrounds[1]}
      style$={{
        animate$fadeIn: {
          args: edges.includes("bottom") ? ["fromBottom"] : ["fromLeft"],
          duration: "1s",
          delay: "150ms"
        }
      }}
    />,
    (edges, rand) => <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        width: "100%"
      }}
    >
      <HCBStat
        data={copy.month[position](findMonthWithMaxAbsoluteSum(organization.spendingByDate))}
        background={shuffledBackgrounds[2]}
        fontSize={"1.3em"}
        style$={{
          animate$fadeIn: {
            args: (edges.includes("bottom") && rand > 0.5) ? ["fromBottom"] : ["fromLeft"],
            duration: "1s",
            delay: "150ms"
          }
        }}
      />
      <HCBStat
        data={USDollarNoCents.format(
          organization.spendingByUser[data.individual.id] / 100
        )}
        label={copy.youSpent[position]()}
        background={shuffledBackgrounds[3]}
        fontSize={"1.9em"}
        style$={{
          animate$fadeIn: {
            args: (edges.includes("bottom") && rand <= 0.5) ? ["fromBottom"] : ["fromRight"],
            duration: "1s",
            delay: "150ms"
          }
        }}
      />
    </div>,
    edges => <div
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

  const shuffledGridFunctions = deterministicShuffle(organization.name, gridItems);
  const shuffledGridItems = shuffledGridFunctions.map((item, i) => {
    const edges = [];
    if (i == 0) edges.push("top");
    if (i == shuffledGridFunctions.length - 1) edges.push("bottom");
    return item(edges, Math.random(), i);
  });
  
  return (
    <div
      {...$({
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
      })}
    >
      <h1
        {...$.title({
          width: "100%",
          marginTop: "24px",
          color: "white",
          marginBottom: $.s2,
          animate$fadeIn: {
            args: position == 0 ? ["fromLeft"] : position == 1 ? ["fromTop"] : ["fromRight"],
            duration: "1500ms"
          }
        })}
      >
        {organization.name}
      </h1>
      {shuffledGridItems}
      <Background />
    </div>
  );
}
