import { CSSProperties, createElement } from "react";

const themeUtils = {
  s1: "var(--spacing-1)",
  s2: "var(--spacing-2)",
  s3: "var(--spacing-3)",
  s4: "var(--spacing-4)",
  s5: "var(--spacing-5)",
  s6: "var(--spacing-6)",
  s7: "var(--spacing-7)",
  s8: "var(--spacing-8)",
  darker: "#121217",
  dark: "#17171d",
  darkless: "#252429",
  black: "#1f2d3d",
  steel: "#273444",
  slate: "#3c4858",
  muted: "#8492a6",
  smoke: "#e0e6ed",
  snow: "#f9fafc",
  white: "#ffffff",
  red: "#ec3750",
  orange: "#ff8c37",
  yellow: "#f1c40f",
  green: "#33d6a6",
  cyan: "#5bc0de",
  blue: "#338eda",
  purple: "#a633d6",
  text: "var(--black)",
  background: "var(--white)",
  elevated: "var(--white)",
  sheet: "var(--snow)",
  sunken: "var(--smoke)",
  border: "var(--smoke)",
  primary: "#ec3750",
  secondary: "#8492a6",
  accent: "#5bc0de",
  twitter: "#1da1f2",
  facebook: "#3b5998",
  instagram: "#e1306c",
  createComponent(element: string, styles?: CSSProperties) {
    // @ts-ignore
    const { classes } = this;

    return ({
      children,
    }: {
      children: JSX.Element | JSX.Element[];
    }): JSX.Element => (
      <>
        {createElement(
          element,
          {
            className: classes.join(" "),
            style: styles,
          },
          children,
        )}
      </>
    );
  },
};

type ThemeUtils = typeof themeUtils;

type ThemeHelper = {
  [key: string]: ThemeHelper;
} & ThemeUtils &
  typeof fn;

function fn(styles?: CSSProperties) {
  // @ts-ignore
  const { classes } = this;

  return {
    className: classes.join(" "),
    style: styles,
  };
}

function generateProxy(classes: string[] = []): ThemeHelper {
  return new Proxy(fn.bind({ classes }), {
    get(_, prop) {
      if (themeUtils[prop as keyof ThemeUtils])
        return themeUtils[prop as keyof ThemeUtils];

      return generateProxy([...classes, prop as string]);
    },
  }) as ThemeHelper;
}

export const $ = generateProxy();
export default $;
