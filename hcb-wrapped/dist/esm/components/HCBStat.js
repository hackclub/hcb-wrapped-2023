import $ from "../utils/theme";
import React from "react";
export default function HCBStat({ data, label, background, }) {
    return (React.createElement("div", Object.assign({}, $({
        background: background || $.sunken,
        borderRadius: "12px",
        padding: `${$.s3} ${$.s4}`,
        textTransform: "uppercase",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    })),
        React.createElement("h2", Object.assign({}, $.title({ fontWeight: 800 })),
            " ",
            data),
        React.createElement("div", Object.assign({}, $({ display: "flex", alignItems: "center", gap: "4px" })),
            React.createElement("b", Object.assign({}, $({
                fontSize: "0.7em",
                fontWeight: 800,
            })), label))));
}
//# sourceMappingURL=HCBStat.js.map