import { ExecService } from '../schema/index.ts'

export class Exec {
  exec = ExecService.containerExec
  start = ExecService.execStart
  resize = ExecService.execResize
  inspect = ExecService.execInspect
}
