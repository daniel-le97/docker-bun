import { connect } from 'bun'
import type { SocketResponse } from './parsers.ts'

export async function socket(string: string, parser: SocketResponse) {
  const getting = new Promise((resolve, reject) => {
    const connected = connect({
      unix: '/var/run/docker.sock',
      socket: {
        error(_, error) {
          reject(error)
        },
        connectError(_, error) {
          reject(error)
        },
        async data(_, _data) {
          const appendOrResolve = async (buffer: Buffer) => {
            parser.parse(buffer)

            if (parser.isComplete)
              resolve(parser.getResponse())
          }
          await appendOrResolve(_data)
        },
        end(_) {
          reject(new Error('socket closed'))
        },
      },
    })
    connected.then(socket => socket.write(string))
  })
  return await getting as Response
}
