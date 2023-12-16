import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

const geoUrl =
"https://cloud-3rq00advo-hack-club-bot.vercel.app/0zips_us_topo.json";

export default function HCBMapped({ data }: SlideProps) {
  const filteredObject = Object.fromEntries(
    Object.entries(data.hcb.spendingByLocation)
      .filter(([key]) => key.startsWith("US"))
      .map(([key, value]) => [key.split(" - ")[2], value])
  );
  const colorScale = scaleQuantile()
    .domain(Object.values(data))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618",
    ]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingBottom: "30px"
        }}
      >
        <h1
          {...$.headline({ fontSize: "2em", marginTop: "0px", color: "white" })}
        >
          We spent from coast to coast.
        </h1>
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }: any) =>
              geographies.map((geo: any) => {
                const cur: number = filteredObject[geo.properties.zip];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      cur
                        ? colorScale(cur)
                        : `#ececec`
                    }
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <Background />
      </div>
    </>
  );
}

HCBMapped.config = {
  bgImage: `linear-gradient(rgba(37,36,41,0.5) 0%, rgba(37,36,41,0.85) 75%), url(https://cloud-e4hjosvw9-hack-club-bot.vercel.app/2outernet-110.jpeg)`
} satisfies SlideOptions;
