import Docker from "./dist/index";



const docker = new Docker()
console.log(docker.container.containerList());
