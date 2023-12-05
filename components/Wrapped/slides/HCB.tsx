import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";

export default function HCB({ data }: SlideProps) {
  return (
    <>
      <>
        <h1 {...$.headline({ fontSize: "2em", marginTop: '0px' })}>It was a BIG year.</h1>
        <div
          {...$({
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px"
          })}
        >
          <HCBStat
            data={data.hcb.organizations.new}
            label="new organizations"
            background={$.orange}
          />
          <HCBStat
            data={data.hcb.users.new}
            label="new users"
            background={$.yellow}
          />
          <HCBStat
            data={USDollarNoCents.format(data.hcb.spent / 100)}
            label="spent by organizations"
            background={$.green}
          />
          <HCBStat
            data={USDollarNoCents.format(data.hcb.raised / 100)}
            label="raised on HCB"
            background={$.cyan}
          />
        </div>
        <div {...$({ margin: `${$.s3} 0`, fontSize: "0.9em" })}>
          All this... plus surviving two bank collapses and{" "}
          <a
            href="https://changelog.hcb.hackclub.com/hack-club-bank-is-now-hcb-273207"
            target="_blank"
          >
            rebranding
          </a>{" "}
          (<i>what's Bank?</i>).
        </div>
        <Background />
      </>
    </>
  );
}

HCB.config = {
  bg: $.white
} satisfies SlideOptions