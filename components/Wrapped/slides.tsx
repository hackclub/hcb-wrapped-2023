import React from "react";
import $ from "@/utils/theme";
import HCB from "./slides/HCB";
import HCBTopMerchants from "./slides/HCBTopMerchants";
import OrgIntro from "./slides/OrgIntro";
import OrgDetails from "./slides/OrgDetails";
import PlatinumCardSlide from "./slides/PlatinumCardSlide";
import Start from "./slides/Start";
import Spender from "./slides/Spender";
import WordCloud from "./slides/WordCloud";
import Hometown from "./slides/HomeTown";
import Ending from "./slides/Ending";
import HCBSection from "./slides/HCBSection";
import type { WrappedData, OrgData } from "@/components/Wrapped/utils/data";
import type { SlideProps, SlideOptions } from "./internals/slidesHelper";

export function generateSlidesOrder(data: WrappedData) {
  let orgSlides: any[] = [];
  if (
    Object.keys(data.organizations)
      .filter((org) => data.organizations[org].spent > 0)
      .filter(
        (org) => data.organizations[org].spendingByUser[data.individual.id]
      ).length > 0
  ) {
    orgSlides.push(OrgIntro);
    Object.keys(data.organizations)
      .filter((org) => data.organizations[org].spent > 0)
      .filter(
        (org) => data.organizations[org].spendingByUser[data.individual.id]
      )
      .sort(
        (a, b) =>
          data.organizations[b].spendingByUser[data.individual.id] -
          data.organizations[a].spendingByUser[data.individual.id]
      )
      .slice(0, 3)
      .map((org) => {
        function OrgSlide({ data }: SlideProps) {
          return (
            <OrgDetails
              data={data}
              organization={{ name: org, ...data.organizations[org] }}
            />
          );
        }
        OrgSlide.config = {
          bgPattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23c0b8cd' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
          duration: 10000
        } satisfies SlideOptions;
        orgSlides.push(OrgSlide);
      });
  }

  return [
    Start,
    Spender,
    PlatinumCardSlide,
    WordCloud,
    Hometown,
    ...orgSlides,
    HCBSection,
    HCBTopMerchants,
    HCB,
    Ending
  ];
}
