#!/usr/bin/env node

import { exec } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const parse = (strings, values) => {
    let output = "";
    strings.forEach((string, i) => {
        output += string + (values[i] || "");
    });
    return output;
};

const $ = (strings, ...values) => {
    const command = parse(strings, values);

    return new Promise((resolve, reject) =>
        exec(command, (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve(stdout);
        })
    );
};

const log$ = (...args) => console.log(...args);
const wait$ = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const path = (...paths) =>
    join(dirname(fileURLToPath(import.meta.url)), ...paths);

const _wrapped = path("../components/Wrapped");
const _package = path("../package");
const _src = path("../package/src");
const _dist = path("../package/dist");

async function main() {
    console.log("> Removing", _src);
    await wait$(2_000);

    log$(
        await $`
        rm -rf ${_src}
    `
    );

    console.log("> Copying files");

    log$(
        await $`
        cp -r ${_wrapped} ${_src}
    `
    );

    console.log("> Building JavaScript");

    log$(
        await $`
        cd ${_package}
        yarn build
    `
    );

    console.log("> Done!");
}

main();
