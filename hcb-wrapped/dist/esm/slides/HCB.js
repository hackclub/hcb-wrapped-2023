import $ from "../utils/theme";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";
import React from "react";
const HCBSlide = (({ data, Continue }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(React.Fragment, null,
            React.createElement("h1", Object.assign({}, $.headline({ fontSize: "2em" })), "It was a BIG year for HCB."),
            React.createElement("div", Object.assign({}, $({
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
            })),
                React.createElement(HCBStat, { data: data.hcb.organizations.new, label: "new organizations", background: $.orange }),
                React.createElement(HCBStat, { data: data.hcb.users.new, label: "new users", background: $.yellow }),
                React.createElement(HCBStat, { data: USDollarNoCents.format(data.hcb.spent / 100), label: "spent by organizations", background: $.green }),
                React.createElement(HCBStat, { data: USDollarNoCents.format(data.hcb.raised / 100), label: "raised on HCB", background: $.cyan })),
            React.createElement("div", Object.assign({}, $({ margin: `${$.s3} 0`, fontSize: "0.9em" })),
                "All this... plus surviving two bank collapses and",
                " ",
                React.createElement("a", { href: "https://changelog.hcb.hackclub.com/hack-club-bank-is-now-hcb-273207", target: "_blank" }, "rebranding"),
                " ",
                "(",
                React.createElement("i", null, "what's Bank?"),
                ").")),
        React.createElement(Continue, null)));
});
export default HCBSlide;
//# sourceMappingURL=HCB.js.map