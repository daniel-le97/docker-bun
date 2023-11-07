import { Containers } from './classes/containers.ts'
import { Distribution } from './classes/distribution.ts'
import { Exec } from './classes/exec.ts'
import { Images } from './classes/images.ts'
import { Networks } from './classes/networks.ts'
import { Plugins } from './classes/plugins.ts'
import { System } from './classes/system.ts'
import { Volumes } from './classes/volumes.ts'
import type { OpenAPIConfig } from './schema/index.ts'
import { ConfigService, NodeService, OpenAPI, SecretService, ServiceService, SessionService, SwarmService, TaskService } from './schema/index.ts'

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

  containers = new Containers()
  images = new Images()
  distibution = new Distribution()
  exec = new Exec()
  networks = new Networks()
  plugins = new Plugins()
  session = SessionService.session
  swarm = {
    init: SwarmService.swarmInit,
    inspect: SwarmService.swarmInspect,
    join: SwarmService.swarmJoin,
    leave: SwarmService.swarmLeave,
    update: SwarmService.swarmUpdate,
    unlock: SwarmService.swarmUnlock,
    unlockKey: SwarmService.swarmUnlockkey,
    services: ServiceService,
    tasks: TaskService,
    secrets: SecretService,
    nodes: NodeService,
    configs: ConfigService,
  }

  system = new System()
  volumes = new Volumes()
}
export default Docker
