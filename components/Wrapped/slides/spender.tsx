import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import HCBStat from "../components/HCBStat";

export default function Spender({ data }: SlideProps) {
  return (
    <>
      <h2 {...$.title({ marginBottom: $.s3 })}>💳</h2>
      <h1 {...$.title({ marginBottom: $.s5 })}>Look at you big spender!</h1>
      <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
        <HCBStat
          isNumber
          data={USDollarNoCents.format(
            Math.abs(data.individual.totalMoneySpent / 100)
          )}
          label="dollars were spent by you this year"
          background={$.yellow}
          prefix=""
        />
        <h1>You placed </h1>
        <HCBStat
          prefix="You placed #"
          data={data.individual.ranking}
          label="on the HCB leaderboard!"
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
