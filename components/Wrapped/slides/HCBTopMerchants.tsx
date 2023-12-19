import $ from "../utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import { USDollarNoCents } from "../utils/formatter";
import HCBStat from "../components/HCBStat";
import title from "title";
import React from "react";

const additionalData: {
  [key: string]: {
    image: string;
    color: string;
    name?: string;
  };
} = {
  PAYPAL: {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_Logo_Icon_2014.svg/1664px-PayPal_Logo_Icon_2014.svg.png",
    color: $.blue
  },
  AMAZON: {
    image: "https://wisdom-stone.com/wp-content/uploads/amazon-logo.png",
    color: $.steel
  },
  "STICKER MULE": {
    image:
      "https://cdn.icon-icons.com/icons2/2699/PNG/512/stickermule_logo_icon_169715.png",
    color: $.stickermule
  },
  "FIRST FOR INSPIRATION & R": {
    image: "https://cloud-6ik9jo5u6-hack-club-bot.vercel.app/0image.png",
    color: $.red,
    name: "FIRST Robotics"
  },
  REVROBOTICS: {
    image: "https://cloud-161bscnw9-hack-club-bot.vercel.app/0image.png",
    color: $.orange
  }
};

export function prettifyCategory(c: string) {
  c = c.toLowerCase();
  c = c.replaceAll("_", " ");
  switch (c) {
    case "travel agencies tour operators":
      return "travel";
    case "eating places restaurants":
      return "restaurants";
    case "hotels motels and resorts":
      return "hotels";
    case "airlines air carriers":
      return "airlines";
    case "stationery_stores_office_and_school_supply_stores":
    case "stationary office supplies printing and writing paper":
      return "stationary";
    case "direct marketing combination catalog and retail merchant":
      return "marketing";
    case "miscellaneous publishing and printing":
      return "printing and publishing";
    case "charitable and social service organizations fundraising":
      return "charitable fundraising";
    case "cable satellite and other pay television and radio":
      return "cable and television";
    case "wires money order":
      return "money wires";
    case "miscellaneous specialty retail":
    case "miscellaneous business services":
      return "miscellaneous";
    case "photographic photocopy microfilm equipment and supplies":
    case "commercial photography art and graphics":
      return "photography and art";
    case "miscellaneous apparel and accessory shops":
      return "apparel and accessory";
    case "postal services government only":
      return "postal services";
    case "miscellaneous home furnishing specialty stores":
    case "furniture home furnishings and equipment stores except appliances":
      return "home furnishings";
    case "gift card novelty and souvenir shops":
      return "gifts";
    case "truck utility trailer rentals":
      return "truck rentals";
    case "music stores musical instruments pianos and sheet music":
      return "music stores";
    case "medical dental ophthalmic and hospital equipment and supplies":
      return "medical equipment";
    case "medical dental ophthalmic and hospital equipment and supplies":
      return "medical equipment";
    case "precious stones and metals watches and jewelry":
    case "jewelry stores watches clocks and silverware stores":
      return "jewelry stores";
    case "telecommunication equipment and telephone sales":
      return "telecommunication";
    case "sewing needlework fabric and piece goods stores":
      return "sewing and fabrics";
    case "sewing needlework fabric and piece goods stores":
      return "sewing and fabrics";
    case "miscellaneous apparel and accessory shops":
    case "mens and boys clothing and accessories stores":
      return "clothing stores";
    default:
      return c;
  }
}

export default function HCBTopMerchants({ data }: SlideProps) {
  let categories = Object.entries(data.hcb.spendingByCategory)
    .sort((a, b) => b[1] - a[1])
    .filter((x) => x[0] != "WIRES_MONEY_ORDERS")
    .map((category) => prettifyCategory(category[0]))
    .slice(0, 5);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100%",
          paddingBottom: "30px"
        }}
      >
        <div
          {...$({
            animate$fadeIn: {
              args: ["fromTop"]
            }
          })}
        >
          <h1
            {...$.headline({ fontSize: "2em", margin: "0px", color: "white" })}
          >
            The far reaches of our dollar bills 💸
          </h1>
          <p {...$.lead({ color: "white", marginTop: $.s1 })}>
            HCB cards were used at{" "}
            {Object.keys(data.hcb.spendingByMerchant).length.toLocaleString()}{" "}
            different merchants over the past year.
          </p>
        </div>
        <div
          {...$({
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
            width: "100%"
          })}
        >
          {Object.entries({
            ...data.hcb.spendingByMerchant,
            AMAZON:
              data.hcb.spendingByMerchant["AMZN MKTP US"] +
              data.hcb.spendingByMerchant["AMAZON.COM"],
            "AMZN MKTP US": 0,
            "AMAZON.COM": 0
          })
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map((merchant, i) => (
              <div
                key={`top-merchant-$`}
                {...$({
                  display: "flex",
                  borderRadius: "8px",
                  background: additionalData[merchant[0]]?.color || $.blue,
                  animate$fadeIn: {
                    args: ["fromLeft"],
                    delay: `${i * 100}ms`
                  }
                })}
              >
                <img
                  src={
                    additionalData[merchant[0]]?.image ||
                    "https://cdn-icons-png.flaticon.com/512/2697/2697432.png"
                  }
                  style={{
                    background: "white",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    height: "72px",
                    width: "72px",
                    objectFit: "contain",
                    padding: "12px"
                  }}
                />
                <div style={{ padding: "12px", color: $.white }}>
                  <b>
                    {title(additionalData[merchant[0]]?.name || merchant[0])}
                  </b>
                  <br /> {USDollarNoCents.format(merchant[1] / 100)}
                </div>
              </div>
            ))}
        </div>
        <div
          {...$({
            margin: `${$.s3} auto`,
            fontSize: "1.2em",
            color: "white",
            textAlign: "left",
            animate$fadeIn: {
              args: ["fromBottom"]
            }
          })}
        >
          The most popular places were {categories[0]}, {categories[1]},{" "}
          {categories[2]}, {categories[3]}, and {categories[4]}.
        </div>
        <Background />
      </div>
    </>
  );
}

HCBTopMerchants.config = {
  bg: $.purple,
  duration: 15_000
} satisfies SlideOptions;
