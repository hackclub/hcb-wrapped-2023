import $ from "../utils/theme";
import type { SlideOptions, SlideProps } from "../internals/slidesHelper";
import { USDollarNoCents } from "../utils/formatter";
import Background from "../components/Background";
import Snowfall from "react-snowfall";
import React, { useEffect, useState } from "react";

function useTimeout(callback: { [key: number]: () => void }) {
  useEffect(() => {
    for (const time in callback) {
      setTimeout(() => {
        callback[time]();
      }, parseInt(time));
    }
  }, []);
}

function useTimedState<T>(callback: { [key: number]: T }, initial: T) {
  const [state, setState] = useState(initial);
  useEffect(() => {
    for (const time in callback) {
      setTimeout(() => {
        setState(callback[time]);
      }, parseInt(time));
    }
  }, []);
  return [state, setState];
}

function useTimedValue<T>(
  callback: (time: number) => T,
  initial: T,
  frequency: number = 500,
  paused: boolean
) {
  // this will impact performance, so it's best to use a higher value
  const [state, setState] = useState(initial);
  const [times, setTimes] = useState(() => [Date.now()]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes((times) => {
        const updated = [...times, Date.now()];
        setState(
          callback(
            updated.reduce(
              (previousValue, currentValue, currentIndex, array) => {
                if (currentIndex % 2 == 1) {
                  return (
                    previousValue + (currentValue - array[currentIndex - 1])
                  );
                }
                return previousValue;
              },
              0
            )
          )
        );
        return times;
      });
    }, frequency);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimes((times) => [...times, Date.now()]);
  }, [paused]);

  return state;
}

export default function Start({ data, isPaused }: SlideProps) {
  const snowflake1 = document.createElement("img");
  snowflake1.src =
    "https://cloud-ftrouxwcr-hack-club-bot.vercel.app/0group_1.png";
  const snowflake2 = document.createElement("img");
  snowflake2.src =
    "https://cloud-ftrouxwcr-hack-club-bot.vercel.app/1group_2.png";
  const images = [snowflake1, snowflake2];

  const snowflakeSpeed = useTimedValue(
    (x) => Math.round((1.6 ** (x / 1000) / 550 + 3) * 100) / 100,
    0 as number,
    50,
    !!isPaused
  );

  const firstName = data.individual.firstName || data.individual.name.split(" ")[0];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        paddingBottom: "80px",
        color: "white",
        textAlign: "center",
        padding: "16px"
      }}
    >
      <h2 {...$.title({ animate$fadeIn: [], marginBottom: $.s3 })}>🏦 🎁 🎉</h2>
      <h1 {...$.title({ animate$fadeIn: [] })}>Wrapped 2023</h1>
      <p
        {...$.lead({
          animate$fadeIn: {
            args: ["fromBottom"],
            delay: "0.5s"
          },
          color: $.white,
          width: "90%",
          marginBottom: $.s1
        })}
      >
        Welcome {firstName}; 2023 was a big year on HCB for you.{" "}
        <b>
          You spent over{" "}
          {USDollarNoCents.format(
            (Math.floor(
              data.individual.totalMoneySpent /
                Math.pow(
                  10,
                  data.individual.totalMoneySpent.toString().length - 1
                )
            ) *
              Math.pow(
                10,
                data.individual.totalMoneySpent.toString().length - 1
              )) /
              100
          )}
          !
        </b>
      </p>
      <p
        {...$.lead({
          animate$fadeIn: {
            args: ["fromBottom"],
            delay: "0.5s"
          },
          color: $.white,
          width: "90%",
          marginTop: $.s1
        })}
      >
        To celebrate, let's take a trip down memory lane and recap the year.
      </p>
      <Background />
      <Snowfall
        images={images}
        speed={[snowflakeSpeed - 0.5, snowflakeSpeed + 0.5]}
        radius={[5, 30]}
        style={{
          animationPlayState: "paused",
          opacity: 0.8
        }}
      />
    </div>
  );
}

Start.config = {
  bg: $.red,
  duration: 15_000
} satisfies SlideOptions;
