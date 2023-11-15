import BankWrapped from "@/components/BankWrapped";
import { generateTestData } from "@/lib/data";

export default function Run() {
  return (
    <>
      <BankWrapped data={generateTestData()} />
    </>
  );
}
