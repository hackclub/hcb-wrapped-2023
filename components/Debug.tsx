// sourced from https://github.com/hackathon-zip/hackathon.zip/blob/main/components/Debug.tsx

import $ from "@/utils/theme";

export function syntaxHighlight(json: string, comment?: string) {
  if (!json) return ""; //no JSON from response

  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return (
    json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      }
    ) + (comment ? '<span class="comment"> // ' + comment + "</span>" : "")
  );
}

export default function Debug({ data }: { data: any }) {
  const key = Object.keys(data)[0];
  const value = data[key];

  return (
    <>
      <style>{`
                pre {
                    outline: 1px solid #ccc;
                    padding: 5px;
                    border: 1px solid #eaeaea;
                    border-radius: 0px;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
                    white-space: pre;
                    overflow: auto;
                    line-height: 1.5;
                    text-align: left;
                    font-size: 14px;
                    box-sizing: inherit;
                    text-rendering: geometricPrecision;
                    -webkit-tap-highlight-color: transparent;
                    background: #ffffff;
                  }
                  *::selection {
                    background-color: ${$.blue}66;
                  }
                  .pre:before, .pre:after {
                    box-sizing: inherit;
                    text-rendering: geometricPrecision;
                    -webkit-tap-highlight-color: transparent;
                  }
                  .string {
                    color: green;
                  }
                  .number {
                    color: darkorange;
                  }
                  .boolean {
                    color: blue;
                  }
                  .null {
                    color: magenta;
                  }
                  .key {
                    color: red;
                  }      
                  .comment {
                    color: gray;
                  }            
            `}</style>
      <pre
        dangerouslySetInnerHTML={{
          __html: syntaxHighlight(JSON.stringify(value, undefined, 4), key)
        }}
      />
    </>
  );
}
