/* eslint-disable unused-imports/no-unused-vars */
import { readFileSync } from 'node:fs'
import { load } from 'js-yaml'
import type { ServiceSpec } from './src/index.ts'
import { Docker } from './src/index.ts'

interface DockerComposeService {
  image?: string
  build?: string
  ports?: string[]
  environment?: { [key: string]: string }
  volumes?: string[]
  depends_on?: string[]
  // Add more service-specific properties as needed
}

interface DockerComposeFile {
  version: string
  services: { [serviceName: string]: DockerComposeService }
  // Add more top-level properties as needed
}

const myDockerCompose: DockerComposeFile = {
  version: '3',
  services: {
    web: {
      image: 'nginx:latest',
      ports: ['80:80'],
    },
    app: {
      build: './app',
      ports: ['3000:3000'],
      environment: {
        NODE_ENV: 'development',
      },
      volumes: ['./app:/app'],
      depends_on: ['db'],
    },
    db: {
      image: 'postgres:latest',
    },
  },
  // Add more top-level properties as needed
}

// class ComposeService{
//     secrets(){
//         const dockr = new Docker()
//         dockr.secrets.secretCreate({
//             ''
//         })
//     }
// }

class Compose {
  docker: Docker
  file: string
  name: string
  compose: DockerComposeFile
  services: [string, DockerComposeService][] | null = null
  private output = {}
  constructor(docker: Docker, file: string, name: string) {
    if (file === undefined || name === undefined)
      throw new Error('please specify a file and a project name')
    this.compose = load(readFileSync(file, 'utf8')) as DockerComposeFile
    this.docker = docker
    this.file = file
    this.name = name
    this.sort()
  }

  sort() {
    this.services = Object.entries(this.compose)
  }

  //   async up() {
  //     try {

  //     }
  //     catch (error) {

//     }
//   }
}

const spec: ServiceSpec
const docker = new Docker().services.serviceCreate(body)

const wireguard = new Compose(docker, 'wireguard.yml', 'wireguard')
