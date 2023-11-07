import { ImageService } from '../schema/index.ts'

export class Images {
  list = ImageService.imageList
  build = ImageService.imageBuild
  buildPrune = ImageService.buildPrune
  create = ImageService.imageCreate
  inspect = ImageService.imageInspect
  history = ImageService.imageHistory
  push = ImageService.imagePush
  tag = ImageService.imageTag
  delete = ImageService.imageDelete
  search = ImageService.imageSearch
  prune = ImageService.imagePrune
  commit = ImageService.imageCommit
  get = ImageService.imageGet
  getAll = ImageService.imageGetAll
  load = ImageService.imageLoad
}
