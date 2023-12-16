import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import styles from "@/styles/PlatinumCardSlide.module.css";

export default function PlatinumCardSlide({ data }: SlideProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <h1
        {...$.title({
          color: "white",
          alignSelf: "start",
          justifySelf: "flex-start"
        })}
      >
        April Fools!
      </h1>

      <div
        style={{
          display: "flex",
          flexGrow: 1,
          height: "100%",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "auto"
        }}
      >
        <div className={styles.platinumCard}>
          <div
            style={{
              opacity: "50%",
              right: "10px",
              top: "10px",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {" "}
            <img
              src="https://icons.hackclub.com/api/icons/0x737A82/bank-account"
              style={{ maxHeight: 28 }}
            />
            <p
              style={{
                margin: 0,
                padding: 0,
                lineHeight: 1,
                fontSize: 16,
                letterSpacing: 2
              }}
            >
              PLATINUM
            </p>
          </div>
          <p className="stripe-card__number fs-mask">
            •••• •••• •••• {data.individual.platinumCard?.lastFourDigits}
          </p>
          <p
            style={{
              display: "flex",
              justifyItems: "flex-end",
              alignItems: "center",
              textTransform: "none",
              marginTop: 0,
              marginBottom: 0
            }}
          >
            <span style={{ fontWeight: "bold" }}>{data.individual.name}</span>
          </p>
        </div>
      </div>

      <Background />
    </div>
  );
}

PlatinumCardSlide.config = {
  bg: $.blue,
  duration: 5_000, // 5 seconds
  skipSlide: (data) => data.individual.platinumCard == undefined
} satisfies SlideOptions;
