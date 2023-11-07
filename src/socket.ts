
import type { SocketResponse } from './parsers.ts'

export async function socket(string: string, parser: SocketResponse) {
  const getting = new Promise<Response>((resolve, reject) => {
    const connected = Bun.connect({
      unix: '/var/run/docker.sock',
      socket: {
        error(_, error) {
          reject(error)
        },
        connectError(_, error) {
          reject(error)
        },
        async data(_, _data) {
          const processData = async (buffer: Buffer) => {
            parser.parse(buffer)

            if (parser.isComplete)
              resolve(parser.getResponse())
          }
          await processData(_data)
        },
        end(_) {
          reject(new Error('socket closed'))
        },
      },
    })
    connected.then(socket => socket.write(string))
  })
  return await getting
}
