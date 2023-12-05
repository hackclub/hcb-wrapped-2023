import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";

type SpendingData = [string, number];

export default function TemplateSlide({ data }: SlideProps) {
  const sortBySpending = (entries: SpendingData[]): SpendingData[] => {
    return entries.sort((a: SpendingData, b: SpendingData) => b[1] - a[1]);
  };

  const SpendingByLocation = sortBySpending(
    Object.entries(data.hcb.spendingByLocation) as SpendingData[]
  ).slice(0, 2);

  const SpendingByMerchant = sortBySpending(
    Object.entries(data.hcb.spendingByMerchant) as SpendingData[]
  ).slice(0, 2);

  return (
    <>
      <h1
        {...$.title({
          textTransform: "uppercase"
        })}
      >
        Money Spent
      </h1>

      <div>
        {SpendingByLocation.map(([location, spending]: SpendingData) => (
          <p key={location}>{`${location} - ${USDollarNoCents.format(
            spending / 100
          )}`}</p>
        ))}
      </div>

      <div>
        {SpendingByMerchant.map(([merchant, spending]: SpendingData) => (
          <p key={merchant}>{`${merchant} - ${USDollarNoCents.format(
            spending / 100
          )}`}</p>
        ))}
      </div>

      <Background />
    </>
  );
}

TemplateSlide.config = {
  bg: $.red,
  duration: 5_000, // 5 seconds
  skipSlide: () => false
};
