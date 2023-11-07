import { ContainerService } from '../schema/index.ts'

export class Containers {
  list = ContainerService.containerList
  create = ContainerService.containerCreate
  inspect = ContainerService.containerInspect
  top = ContainerService.containerTop
  logs = ContainerService.containerLogs
  changes = ContainerService.containerChanges
  export = ContainerService.containerExport
  stats = ContainerService.containerStats
  resize = ContainerService.containerResize
  start = ContainerService.containerStart
  stop = ContainerService.containerStop
  restart = ContainerService.containerRestart
  kill = ContainerService.containerKill
  update = ContainerService.containerUpdate
  rename = ContainerService.containerRename
  pause = ContainerService.containerPause
  unpause = ContainerService.containerUnpause
  attach = ContainerService.containerAttach
  attachWebsocket = ContainerService.containerAttachWebsocket
  wait = ContainerService.containerWait
  delete = ContainerService.containerDelete
  archiveInfo = ContainerService.containerArchiveInfo
  archive = ContainerService.containerArchive
  putContainerArchive = ContainerService.putContainerArchive
  prune = ContainerService.containerPrune
}
