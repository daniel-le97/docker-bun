import { ConfigService, ContainerService, DistributionService, ExecService, ImageService, NetworkService, NodeService, PluginService, SecretService, ServiceService, SessionService, SwarmService, SystemService, TaskService, VolumeService } from './src/schema/index.ts'

export class Docker {
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

const client = new Docker()

console.log(await client.container.containerList())
