import type Docker from '../../index.ts'
import type { DockerComposeFile, DockerComposeService } from '../index.ts'

export class ComposeServices {
  docker: Docker
  composeYaml: DockerComposeFile
  name: string
  services: [string, DockerComposeService][]
  constructor(docker: Docker, composeYaml: DockerComposeFile, name: string) {
    this.docker = docker
    this.composeYaml = composeYaml
    this.name = name
    this.services = Object.entries(composeYaml)
  }

  async up() {
    for await (const [servieName, service] of this.services)
      // eslint-disable-next-line no-console
      console.log({ servieName, service })
  }
}
