import type { OpenAPIConfig } from './schema/index.ts'
import { ConfigService, ContainerService, DistributionService, ExecService, ImageService, NetworkService, NodeService, OpenAPI, PluginService, SecretService, ServiceService, SessionService, SwarmService, SystemService, TaskService, VolumeService } from './schema/index.ts'

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

  container = ContainerService
  image = ImageService
  config = ConfigService
  distibution = DistributionService
  exec = ExecService
  network = NetworkService
  node = NodeService
  plugin = PluginService
  secret = SecretService
  session = SessionService
  service = ServiceService
  swarm = SwarmService
  system = SystemService
  task = TaskService
  volume = VolumeService
}
export default Docker
