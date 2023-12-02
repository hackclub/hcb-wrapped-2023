import { Wrapped } from "@/components/Wrapped";
import { generateTestData } from "@/components/Wrapped/utils/data";
import type { WrappedData } from "@/components/Wrapped/utils/data";

import dynamic from "next/dynamic";

export default function Run({ data }: { data: WrappedData }) {
  return (
    <>
      <Wrapped data={data} />
    </>
  );
}

// prevents hydration errors

export async function getServerSideProps() {
  return {
    props: {
      data: generateTestData()
    }
  };
}
