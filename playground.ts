/* eslint-disable no-console */
import Docker from "docker-bun";

const docker = new Docker()

console.log(await docker.containers.containerList());
