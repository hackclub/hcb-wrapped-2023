import $ from "@/components/Wrapped/utils/theme";

const Heading = $.heading.createComponent("div", {
  background: $.sheet,
  textAlign: "center",
  paddingTop: $.s5,
  paddingBottom: $.s4
});

export default function Home() {
  return (
    <>
      <Heading>
        <h1
          {...$.title({
            color: $.primary
          })}
        >
          HCB Wrapped 2023
        </h1>
        <p {...$.headline()}>🎁 Your year on HCB, wrapped</p>
      </Heading>
      <div
        {...$.container({
          paddingTop: $.s3,
          paddingBottom: $.s3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: $.s3
        })}
      >
        <h3
          {...$.eyebrow({
            margin: "0px"
          })}
        >
          Actions
        </h3>
        <button
          onClick={() => {
            window.open("/run", "HCB Wrapped 2023");
          }}
        >
          Run HCB Wrapped 2023 →
        </button>
        <button
          onClick={() => {
            window.open("/data", "Test Data");
          }}
        >
          View Testing Data →
        </button>
      </div>
    </>
  );
}
