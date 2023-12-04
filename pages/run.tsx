import { Wrapped } from "@/components/Wrapped";
import { generateTestData } from "@/components/Wrapped/utils/data";
import type { WrappedData } from "@/components/Wrapped/utils/data";
import fs from 'fs/promises';
import path from 'path';

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
  try {
    // Attempt to load data from data.json
    const filePath = path.join(process.cwd(), 'test.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    return {
      props: {
        data
      }
    };
  } catch (error) {
    // Default to test data
    return {
      props: {
        data: generateTestData()
      }
    };
  }
}

