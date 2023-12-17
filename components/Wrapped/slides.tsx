import React from "react";
import $ from "@/utils/theme";
import HCB from "./slides/HCB";
import HCBTopMerchants from "./slides/HCBTopMerchants";
import HCBMapped from "./slides/HCBMapped";
import OrgIntro from "./slides/OrgIntro";
import OrgDetails from "./slides/OrgDetails";
import PlatinumCardSlide from "./slides/PlatinumCardSlide";
import Start from "./slides/Start";
import Spender from "./slides/Spender";
import WordCloud from "./slides/WordCloud";
import Hometown from "./slides/HomeTown";
import Ending from "./slides/Ending";
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
          bg: $.green,
          duration: 10000
        } satisfies SlideOptions;
        orgSlides.push(OrgSlide);
      });
  }

  return [
    Start,
    HCB,
    HCBMapped,
    HCBTopMerchants,
    Spender,
    WordCloud,
    Hometown,
    ...orgSlides,
    PlatinumCardSlide,
    Ending
  ];
}
