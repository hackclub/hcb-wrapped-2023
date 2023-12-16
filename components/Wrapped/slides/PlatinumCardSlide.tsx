import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import styles from "@/styles/PlatinumCardSlide.module.css";

export default function PlatinumCardSlide({ data }: SlideProps) {
  return (
    <>
      <h1
        {...$.title({
          // You can apply classes by daisy-chaining them after the $
          // You can then add CSS properties like you
          // normally would inside of this object
          color: "white"
        })}
      >
        April fools.
      </h1>

      {/* <div style={{display: "flex", flexGrow: 1, justifyContent: "center", flexDirection: "column", overflow: "auto"}}>  */}
      <div className={styles.platinumCard}>
   
        <div
          className="bold caps h6 absolute flex items-center"
          style={{
            opacity: "50%",
            right: "10px",
            top: "10px",
            position: "absolute",
            display: "flex"
          }}
        >   <svg color="#000">
        <path d="M16.194 8.096A2.397 2.397 0 0 0 16 8.018V6c.358 0 .735.149.997.264.297.13.676.326 1.077.555a37.817 37.817 0 0 1 2.878 1.864c2.15 1.518 2.548 1.817 4.755 3.61a.999.999 0 1 1-1.414 1.414C22 12 21.9 11.799 19.798 10.317a35.088 35.088 0 0 0-2.716-1.761 9.091 9.091 0 0 0-.888-.46zM15.806 8.096c.09-.04.153-.064.194-.078V6c-.358 0-.735.149-.997.264-.297.13-.676.326-1.077.555a37.817 37.817 0 0 0-2.878 1.864C8.9 10.201 8.5 10.5 6.293 12.293a.999.999 0 1 0 1.414 1.414c2.294-1.707 2.394-1.908 4.495-3.39a35.088 35.088 0 0 1 2.716-1.761c.365-.209.65-.357.888-.46zM7 24a1 1 0 0 1 1-1h16a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 22a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM21 22a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM11 22a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z"
        />
      </svg>PLATINUM
        </div>
        {/* <p className="absolute m0" style={{right: 0, marginRight: "1.5rem", marginLeft: "3.5rem"}}>
      card name
    </p> */}
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
          <span>{data.individual.name}</span>
        </p>
      </div>
      {/* </div> */}

      <Background />
    </>
  );
}

PlatinumCardSlide.config = {
  bg: $.blue,
  duration: 5_000, // 5 seconds
  skipSlide: (data) => data.individual.platinumCard == undefined
} satisfies SlideOptions;
