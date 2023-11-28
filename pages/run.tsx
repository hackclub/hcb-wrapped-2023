import { BankWrapped } from "@hackclub/hcb-wrapped";
import { generateTestData } from "@/hcb-wrapped/src/utils/data";
import type { WrappedData } from "@/hcb-wrapped/src/utils/data";

import dynamic from 'next/dynamic'
 
const DynamicHeader = dynamic(() => import('@hackclub/hcb-wrapped'), {
  ssr: false,
})

export default function Run({ data }: { data: WrappedData }) {
  return (
    <>
      <BankWrapped data={data} />
    </>
  );
}

// prevents hydration errors

export async function getServerSideProps() {
  return {
    props: {
      data: generateTestData(),
    },
  };
}
