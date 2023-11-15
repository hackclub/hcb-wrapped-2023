import BankWrapped from "@/components/BankWrapped";
import { generateTestData } from "@/lib/data";
import type { WrappedData } from "@/lib/data";

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
