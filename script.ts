/* eslint-disable node/prefer-global/process */
import { $ } from 'bnx'
import consola from 'consola'

consola.start('generating Docker Api')

const directory = `${process.cwd()}/src/schema`
const command = `bun openapi --input ./src/open-api.yaml --output ${directory}`
try {
  await $(command)
}
catch (error) {
  consola.error('unable to generate Docker Api')
}
const file = `${directory}/core/request.ts`
const fileContents = await Bun.file(file).text()

const addImport = 'import { socket } from \'../../socket.ts\'\nimport { SocketRequest, SocketResponse } from \'../../parsers.ts\''

const toReplace = 'return await fetch(url, request);'
const replacer = 'const newUrl = new SocketRequest(url, request).toString()\nreturn await socket(newUrl, new SocketResponse())'

const newFile = fileContents.replace('/* eslint-disable */', `/* eslint-disable */\n${addImport}`).replace(toReplace, replacer)

await Bun.write(file, newFile)

consola.success('finished generating Docker Api')

// consola.info(generated)
