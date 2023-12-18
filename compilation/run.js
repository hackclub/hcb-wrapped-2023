import { exec } from "child-process-promise";
import { dirname } from "path";
import { fileURLToPath } from "url";

const $ = async (commands) => (await exec(commands.join(" "))).stdout;
const _ = (...paths) =>
    paths.join(dirname(fileURLToPath(import.meta.url)), ...paths);

$`cd ${_("../")}`;
