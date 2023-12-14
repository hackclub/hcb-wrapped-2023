import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import type { OrgData, WrappedData } from "@/components/Wrapped/utils/data";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";

export default function OrgDetails({
  data,
  organization
}: {
  data: WrappedData;
  organization: OrgData & { name: string };
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        paddingBottom: "80px",
        color: "black",
        textAlign: "center"
      }}
    >
      <h1 {...$.title({ animation: "fadeIn 1s" })}>{organization.name}</h1>
      <Background />
    </div>
  );
}
