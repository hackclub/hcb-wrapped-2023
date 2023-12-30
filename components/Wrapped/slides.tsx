import React from "react";
import $ from "./utils/theme";
import HCB from "./slides/HCB";
import HCBTopMerchants from "./slides/HCBTopMerchants";
import OrgIntro from "./slides/OrgIntro";
import OrgDetails from "./slides/OrgDetails";
import ByDate from "./slides/ByDate";
import PlatinumCardSlide from "./slides/PlatinumCardSlide";
import Start from "./slides/Start";
import Spender from "./slides/Spender";
import WordCloud from "./slides/WordCloud";
import Receipts from "./slides/Receipts";
import Hometown from "./slides/HomeTown";
import Ending from "./slides/Ending";
import HCBSection from "./slides/HCBSection";
import type { WrappedData, OrgData } from "./utils/data";
import type { SlideProps, SlideOptions } from "./internals/slidesHelper";

export const isEmpty = (obj: Object) => Object.keys(obj).length === 0;
export const isNotEmpty = (obj: Object) => !isEmpty(obj);

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
      .filter((org) => {
        const orgData = data.organizations[org];
        return (
          orgData.spendingByUser[data.individual.id] &&
          isNotEmpty(orgData.spendingByCategory) &&
          isNotEmpty(orgData.spendingByDate) &&
          isNotEmpty(orgData.spendingByLocation) &&
          isNotEmpty(orgData.spendingByMerchant)
        );
      })
      .sort(
        (a, b) =>
          data.organizations[b].spendingByUser[data.individual.id] -
          data.organizations[a].spendingByUser[data.individual.id]
      )
      .slice(0, 3)
      .map((org, index) => {
        function OrgSlide({ data }: SlideProps) {
          return (
            <OrgDetails
              data={data}
              position={index}
              organization={{ name: org, ...data.organizations[org] }}
            />
          );
        }
        OrgSlide.config = {
          bgPattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23c0b8cd' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
          duration: 10000,
          cache: (data) => [getOrgImage(data.organizations[org])]
        } satisfies SlideOptions;
        orgSlides.push(OrgSlide);
      });
  }

  function getOrgImage(data: OrgData) {
    let location = Object.keys(
      Object.entries(data.spendingByLocation)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    )[0].split(" - ");
    return `https://wrapped-maps.hackclub.dev/api/maps?location=${encodeURIComponent(
      JSON.stringify(location)
    )}`;
  }

  return [
    Start,
    Spender,
    ByDate,
    PlatinumCardSlide,
    Receipts,
    WordCloud,
    Hometown,
    ...orgSlides,
    HCBSection,
    HCBTopMerchants,
    HCB,
    Ending
  ];
}
