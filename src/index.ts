import type { OpenAPIConfig } from './schema/index.ts'
import { ConfigService, ContainerService, DistributionService, ExecService, ImageService, NetworkService, NodeService, OpenAPI, PluginService, SecretService, ServiceService, SessionService, SwarmService, SystemService, TaskService, VolumeService } from './schema/index.ts'
import { socketsService } from './socket.ts';


export class Docker {

  constructor(opts?: OpenAPIConfig) {
    OpenAPI.BASE = opts?.BASE ?? OpenAPI.BASE
    OpenAPI.VERSION = opts?.VERSION ?? OpenAPI.VERSION
    OpenAPI.WITH_CREDENTIALS = opts?.WITH_CREDENTIALS ?? OpenAPI.WITH_CREDENTIALS
    OpenAPI.CREDENTIALS = opts?.CREDENTIALS ?? OpenAPI.CREDENTIALS
    OpenAPI.TOKEN = opts?.TOKEN ?? OpenAPI.TOKEN
    OpenAPI.USERNAME = opts?.USERNAME ?? OpenAPI.USERNAME
    OpenAPI.PASSWORD = opts?.PASSWORD ?? OpenAPI.PASSWORD
    OpenAPI.HEADERS = opts?.HEADERS ?? OpenAPI.HEADERS
    OpenAPI.ENCODE_PATH = opts?.ENCODE_PATH ?? OpenAPI.ENCODE_PATH
  }
  containers = ContainerService
  images = ImageService
  distibution = DistributionService
  exec = ExecService
  networks = NetworkService
  plugins = PluginService
  session = SessionService
  swarm = {
    swarm: SwarmService,
    services: ServiceService,
    tasks: TaskService,
    secrets: SecretService,
    nodes: NodeService,
    configs: ConfigService,
  }

  system = SystemService
  volumes = VolumeService
}
export default Docker

