import {PluginService} from '../schema/index.ts'

export class Plugins{
list = PluginService.pluginList
getPluginPrivileges = PluginService.getPluginPrivileges
pull = PluginService.pluginPull
inspect = PluginService.pluginInspect
delete = PluginService.pluginDelete
enable = PluginService.pluginEnable
disable = PluginService.pluginDisable
upgrade = PluginService.pluginUpgrade
create = PluginService.pluginCreate
push = PluginService.pluginPush
set = PluginService.pluginSet
}