import {VolumeService} from '../schema/index.ts'

export class Volumes {
list = VolumeService.volumeList
create = VolumeService.volumeCreate
inspect = VolumeService.volumeInspect
update = VolumeService.volumeUpdate
delete = VolumeService.volumeDelete
prune = VolumeService.volumePrune
}