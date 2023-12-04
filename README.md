# `@hackclub/hcb-wrapped-2023`

This repository houses the React component used to generate [hcb.hackclub.com/wrapped](https://hcb.hackclub.com/wrapped). It also contains a Next.js site used for testing.

## Directory

- [`/components/BankWrapped/`](/components/BankWrapped/): directory with all code associated with the React component. This code is running in production on [hcb.hackclub.com/wrapped](https://hcb.hackclub.com/wrapped).

- [`/lib/data.ts`](/lib/data.ts): helper file used to generate test data / define the data schema.

- [`/pages/`](/pages): Next.js site used for testing.

## Contributing

We'd love you help making HCB Wrapped incredible! We plan to launch Wrapped on the 17th of December. Before then, we've got to design a dozen or so "slides". Each slide will feature different pieces of data about how the user used HCB over the past year. 

When it comes to testing data, you've got two options:

* Download you personal test data (`test.json`) from [hcb.hackclub.com/wrapped/data](https://hcb.hackclub.com/wrapped/data) and place it in your root directory (don't worry, we've git-ignored all `test.json` files!).
* Use randomly generated test data, this is enabled be default (delete your `test.json` to go back to using it).

To create a slide:

* Copy the template in `components/Wrapped/slides/TemplateSlide.tsx`.
* Add your slide to the array exported by `components/Wrapped/slides.ts`.
* Start designing! You can take inspiration from [last year's Wrapped](https://hcb.hackclub.com/wrapped).
  * You'll have access to the entire `data` object in your component. It'll conform to the type defined in `components/Wrapped/utils/data.ts`.
  * We're using the `$` theme utlity; it provides shorthands for including classes and variables from [hackclub.css](https://css.hackclub.com)/
    * Here's an example where the `.title` and `.eyebrow` classes are applied to the element as well as some additional styling
      ```js
      <h2 {...$.title.eyebrow({ fontWeight: 800 })}>{data}</h2>
      ```
    * To access a variable just do `$.var`, for example `$.s1` for `var(--spacing-1)` or `$.cyan` for `var(--cyan)`.

If at any point, you need help, drop a message in `#hcb-internals` and we'll (Ian, Gary & Sam) do everything we can to help out. If you feel like you need additional data for your slide to be great, let us know and we'll get you that data.

## Motivation for Structure

HCB is closed source, however, we wanted to open source the wrapped page [as we did last year](https://github.com/hackclub/hcb-wrapped-2022) while also having access to private data. Hence, this setup.
