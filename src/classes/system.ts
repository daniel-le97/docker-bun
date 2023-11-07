import { SystemService } from '../schema/index.ts'

export class System {
  auth = SystemService.systemAuth
  info = SystemService.systemInfo
  version = SystemService.systemVersion
  ping = SystemService.systemPing
  pingHead = SystemService.systemPingHead
  events = SystemService.systemEvents
  dataUsage = SystemService.systemDataUsage
}
