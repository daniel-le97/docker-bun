/* eslint-disable no-console */
import Docker from "./src/index.ts";

const docker = new Docker()

console.log(await docker.containers.containerList());
