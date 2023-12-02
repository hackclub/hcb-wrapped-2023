import $ from "@/utils/theme";
import type { SlideProps } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";

export default function Start({ data }: SlideProps) {
  return (
    <>
      <h2 {...$.title({ marginBottom: $.s3 })}>🏦 🎁 🎉</h2>
      <h1 {...$.title()}>
        <span {...$({ color: "var(--red)" })}>HCB</span> Wrapped 2023
      </h1>
      <p {...$.lead()}>
        Welcome {data.individual.firstName}; it was a big year on HCB for you.
        You spent over{" "}
        {USDollarNoCents.format(
          Math.floor(
            data.individual.totalMoneySpent /
              Math.pow(
                10,
                data.individual.totalMoneySpent.toString().length - 1
              )
          ) *
            Math.pow(10, data.individual.totalMoneySpent.toString().length - 1)
        )}
        ! To celebrate, let's take a trip down memory lane and recap your year
        on HCB.
      </p>
    </>
  );
}
