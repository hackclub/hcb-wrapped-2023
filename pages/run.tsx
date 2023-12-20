import { generateTestData } from "@/components/Wrapped/utils/data";
import type { WrappedData } from "@/components/Wrapped/utils/data";
import fs from "fs/promises";
import path from "path";
import dynamic from "next/dynamic";

export default function Run({ data, filename }: { data: WrappedData, filename: string }) {
  const Wrapped = dynamic(
    () => import("@/components/Wrapped").then((mod) => mod.Wrapped),
    {
      ssr: false
    }
  );
  console.log({ filename, data });

  return (
    <>
      <Wrapped data={data} />
    </>
  );
}

// prevents hydration errors

export async function getServerSideProps() {
  try {
    const folder = process.cwd() // You can change this path to your downloads folder
    
    const files = await fs.readdir(folder);
    const nums = files
      .map((file) => file.match(/wrapped \((\d+)\)\.json/)?.[1])
      .filter((num) => num !== undefined)
      .map((num) => parseInt(num as string));
    
    const num = Math.max(...nums);
    const filename = num == -Infinity ? "wrapped.json" : `wrapped (${num}).json`;
    
    // Attempt to load data from wrapped.json
    const filePath = path.join(folder, filename);
    console.log({ filePath });
    
    const jsonData = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData);
    return {
      props: {
        data,
        filename
      }
    };
  }
  catch {
    return {
      props: {
        data: generateTestData(),
        filename: 'wrapped.json'
      }
    };
  }
  
}
