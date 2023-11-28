import $ from "../utils/theme";
import { USDollarNoCents } from "../utils/formatter";
import React from "react";
const StartSlide = (({ data, Continue }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", Object.assign({}, $.title({ marginBottom: $.s3 })), "\uD83C\uDFE6 \uD83C\uDF81 \uD83C\uDF89"),
        React.createElement("h1", Object.assign({}, $.title()),
            React.createElement("span", Object.assign({}, $({ color: "var(--red)" })), "HCB"),
            " Wrapped 2023"),
        React.createElement("p", Object.assign({}, $.lead()),
            "Welcome ",
            data.individual.firstName,
            "; it was a big year on HCB for you. You spent over",
            " ",
            USDollarNoCents.format(Math.floor(data.individual.totalMoneySpent /
                Math.pow(10, data.individual.totalMoneySpent.toString().length - 1)) *
                Math.pow(10, data.individual.totalMoneySpent.toString().length - 1)),
            "! To celebrate, let's take a trip down memory lane and recap your year on HCB."),
        React.createElement(Continue, null,
            "Click here to ",
            React.createElement("i", null, "unwrap"),
            " the year...")));
});
export default StartSlide;
//# sourceMappingURL=Start.js.map