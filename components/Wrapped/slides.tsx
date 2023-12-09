import React from "react";
import HCB from "./slides/HCB";
import OrgIntro from "./slides/OrgIntro";
import Start from "./slides/Start";
import Spender from "./slides/spender";
import type { WrappedData, OrgData } from "@/components/Wrapped/utils/data";

const OrgDetails = ({ data, slug }: { data: OrgData; slug: string }) => (
  <>{slug}</>
);

export function generateSlidesOrder(data: WrappedData) {
  let orgSlides: any[] = [];
  if (Object.keys(data.organizations)
  .filter((org) => data.organizations[org].spent > 0)
  .filter(
    (org) =>
      data.organizations[org].spendingByUser[data.individual.id]
  ).length > 0) {
    orgSlides.push(OrgIntro);
    Object.keys(data.organizations)
      .filter((org) => data.organizations[org].spent > 0)
      .filter(
        (org) =>
          data.organizations[org].spendingByUser[data.individual.id]
      )
      .sort(
        (a, b) =>
          data.organizations[b].spendingByUser[data.individual.id] -
          data.organizations[a].spendingByUser[data.individual.id]
      )
      .slice(0, 3)
      .map((org) => {
        orgSlides.push(({ data }: { data: WrappedData }) => (
          <OrgDetails data={data.organizations[org]} slug={org} />
        ));
      });
  }

  // this is temp coz we don't have the designs yet.
  
  orgSlides = orgSlides.length > 0 ? [orgSlides[0]] : []
  
  return [Start, HCB, Spender];
}
