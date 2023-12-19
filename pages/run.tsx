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
  // The wrapped (1).json file is located in the downloads folder
  const downloads = "/Users/garyhtou/Downloads/Hack Club Downloads"

  // The filename may change, so we need to find the latest one. For example:
  // wrapped (2).json
  // The higher the number, the more recent the file
  const files = await fs.readdir(downloads);
  const nums = files
    .map((file) => file.match(/wrapped \((\d+)\)\.json/)?.[1])
    .filter((num) => num !== undefined)
    .map((num) => parseInt(num as string));

  const num = Math.max(...nums);
  const filename = `wrapped (${num}).json`;

  // Attempt to load data from wrapped.json
  const filePath = path.join( "/Users/garyhtou/Downloads/Hack Club Downloads", filename);
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
