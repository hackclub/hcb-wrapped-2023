import data from "@/hcb-wrapped/src/utils/data";
import Debug, { syntaxHighlight } from "@/components/Debug";
import { useState } from "react";

export default function dataPage() {
  const [query, setQuery] = useState("");
  return (
    <>
      <Debug
        data={{
          data
        }}
      />
      <div
        style={{
          position: "sticky",
          width: "100%",
          minHeight: "24px",
          bottom: "0px",
          left: "0px",
          margin: "0px",
          lineHeight: "0px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          background: "white"
        }}
      >
        <div
          style={{
            cursor: "text",
            flex: "1",
            height: "100%"
          }}
        >
          <input
            style={{
              height: "100%",
              border: "none",
              outline: "none",
              margin: "0px",
              padding: "0px 8px",
              borderRadius: "0px",
              fontSize: "14px",
              fontFamily:
                "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace"
            }}
            placeholder="Enter a query"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <pre
          dangerouslySetInnerHTML={{
            __html: (() => {
              function evaluateQuery(data: any, query: string): string {
                try {
                  if (query === "") return "No results";
                  return JSON.stringify(
                    (0, eval)(/*js*/ `
                                (() => {
                                    with (${JSON.stringify(data)}) {
                                        return ${query};
                                    }
                                })();
                            `),
                    null,
                    4
                  );
                } catch (err) {
                  console.error(err);
                  return "No results";
                }
              }

              return syntaxHighlight(evaluateQuery(data, query));
            })()
          }}
          style={{
            padding: "0px 8px",
            border: "none",
            maxHeight: "96px",
            overflowX: "hidden"
          }}
        />
      </div>
    </>
  );
}
