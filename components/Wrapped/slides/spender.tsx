import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";
import CountUp from "react-countup";

export default function Spender({ data }: SlideProps) {
  return (
    <>
      <h2 {...$.title({ marginBottom: $.s3 })}>💳</h2>
      <h1 {...$.title({ marginBottom: $.s4 })}>
        Look at you big spender! You spent $
        <CountUp end={Math.abs(data.individual.totalMoneySpent / 100)} /> this
        year.
      </h1>

      <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
        <HCBStat
          topLabel={`By spending ${USDollarNoCents.format(
            Math.abs(
              Object.values(
                Object.entries(data.individual.spendingByMerchant)
                  .sort(([, a], [, b]) => b - a)
                  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
              )[0] / 100
            )
          )}, you kept`}
          data={
            Object.keys(
              Object.entries(data.individual.spendingByMerchant)
                .sort(([, a], [, b]) => b - a)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
            )[0]
          }
          label="in buisness this year."
          background={$.orange}
        />
        <HCBStat
          topLabel="Your favourite type of business were"
          data={
            Object.keys(
              Object.entries(data.individual.spendingByCategory)
                .sort(([, a], [, b]) => b - a)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
            )[0]
          }
          label={`buisnesses. You spent ${USDollarNoCents.format(
            Math.abs(
              Object.values(
                Object.entries(data.individual.spendingByCategory)
                  .sort(([, a], [, b]) => b - a)
                  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
              )[0] / 100
            )
          )} with them.`}
          background={$.blue}
        />
        <HCBStat
          topLabel="You spent more than"
          data={100 - data.individual.ranking + "%"}
          label="of other HCB users!"
          background={$.green}
        />
      </div>
      <Background />
    </>
  );
}

Spender.config = {
  bg: $.primary
} satisfies SlideOptions;
