import {NetworkService} from '../schema/index.ts'

export class Networks{
list = NetworkService.networkList
inspect = NetworkService.networkInspect
delete = NetworkService.networkDelete
create = NetworkService.networkCreate
connect = NetworkService.networkConnect
disconnect = NetworkService.networkDisconnect
prune = NetworkService.networkPrune
}