import type { Socket } from 'bun'
import { UnixSocketOptions } from 'bun'
import type { SocketRequest } from './parsers.ts'
import { SocketResponse } from './parsers.ts'

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

type SocketCallback = (res: Response) => void | Promise<void>
class SocketService {
  private unix: string
  public socket: Socket | null = null
  private callback: SocketCallback | null = null
  constructor(unix: string = '/var/run/docker.sock') {
    this.unix = unix
  }

  async send(request: SocketRequest, cb?: SocketCallback) {
    if (!this.socket)
      throw new Error('Not connected to docker daemon.')
    this.callback = cb || null
    this.socket.write(request.toString())
  }

  get isConnected() {
    return this.socket !== null
  }

  disconnect() {
    if (!this.socket)
      throw new Error('Not connected to docker daemon.')
    this.socket.end()
    this.socket = null
  }

  async connect() {
    if (this.isConnected)
      return

    const parser = new SocketResponse()
    const resolveParser = async (buffer: Buffer) => {
      parser.parse(buffer)

      if (parser.isComplete) {
        const response = parser.getResponse()
        if (this.callback)
          await this.callback(response)
        parser.reset()
      }
    }
    this.socket = await Bun.connect({
      unix: this.unix,
      socket: {
        error(_socket, error) {
          throw error
        },
        connectError(_, error) {
          throw error
        },
        async data(_socket, _data) {
          await resolveParser(_data)
        },
        end(_socket) {
          // eslint-disable-next-line no-console
          console.log('socket has been closed')
        },
      },
    })
  }
}

export const socketsService = new SocketService()
