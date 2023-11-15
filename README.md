# `@hackclub/hcb-wrapped-2023`

This repository houses the React component used to generate [hcb.hackclub.com/wrapped](https://hcb.hackclub.com/wrapped). It also contains a Next.js site used for testing.

## Directory

* [`/components/BankWrapped/`](/components/BankWrapped/): directory with all code associated with the React component. This code is running in production on [hcb.hackclub.com/wrapped](https://hcb.hackclub.com/wrapped).

* [`/lib/data.ts`](/lib/data.ts): helper file used to generate test data / define the data schema.

* [`/pages/`](/pages): Next.js site used for testing.

## Motivation for Structure

HCB is closed source, however, we wanted to open source the wrapped page [as we did last year](https://github.com/hackclub/hcb-wrapped-2022) while also having access to private data. Hence, this setup.