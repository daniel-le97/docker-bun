import type { HTTPParserJS } from 'http-parser-js'
import { HTTPParser } from 'http-parser-js'

export class RequestParser {
  private parser: HTTPParserJS
  public complete: boolean = false
  private shouldKeepAlive: boolean = false
  private upgrade: boolean = false
  private method: string | undefined
  private url: string = ''
  private versionMajor: number = 0
  private versionMinor: number = 0
  private headers: any[] = []
  private trailers: any[] = []
  private bodyChunks: Buffer[] = []

  constructor() {
    this.parser = new HTTPParser(HTTPParser.REQUEST)

    this.parser[HTTPParser.kOnHeadersComplete] = (req: any) => {
      this.shouldKeepAlive = req.shouldKeepAlive
      this.upgrade = req.upgrade
      this.method = HTTPParser.methods[req.method]
      this.url = req.url
      this.versionMajor = req.versionMajor
      this.versionMinor = req.versionMinor
      this.headers = req.headers
    }

    this.parser[HTTPParser.kOnBody] = (chunk: Buffer, offset: number, length: number) => {
      this.bodyChunks.push(chunk.subarray(offset, offset + length))
    }

    this.parser[HTTPParser.kOnHeaders] = (t: any) => {
      this.trailers = t
    }

    this.parser[HTTPParser.kOnMessageComplete] = () => {
      this.complete = true
    }
  }

  public parse(input: Buffer) {
    this.parser.execute(input)
    this.parser.finish()
  }

  getRequest() {
    if (!this.complete)
      throw new Error('Could not parse request')

    const body = Buffer.concat(this.bodyChunks)

    return {
      shouldKeepAlive: this.shouldKeepAlive,
      upgrade: this.upgrade,
      method: this.method,
      url: this.url,
      versionMajor: this.versionMajor,
      versionMinor: this.versionMinor,
      headers: this.headers,
      body,
      trailers: this.trailers,
    }
  }
}

export class SocketResponse {
  private parser: HTTPParserJS
  private complete: boolean = false
  private shouldKeepAlive: boolean = false
  private upgrade: boolean = false
  private statusCode: number = 0
  private statusMessage: string = ''
  private versionMajor: number = 0
  private versionMinor: number = 0
  private headers: any[] = []
  private trailers: any[] = []
  private bodyChunks: Buffer[] = []

  constructor() {
    this.parser = new HTTPParser(HTTPParser.RESPONSE)
    this.parser[HTTPParser.kOnHeadersComplete] = (res: any) => {
      this.shouldKeepAlive = res.shouldKeepAlive
      this.upgrade = res.upgrade
      this.statusCode = res.statusCode
      this.statusMessage = res.statusMessage
      this.versionMajor = res.versionMajor
      this.versionMinor = res.versionMinor
      this.headers = res.headers
    }

    this.parser[HTTPParser.kOnBody] = (chunk: Buffer, offset: number, length: number) => {
      this.bodyChunks.push(chunk.subarray(offset, offset + length))
    }

    this.parser[HTTPParser.kOnHeaders] = (t: any) => {
      this.trailers = t
    }

    this.parser[HTTPParser.kOnMessageComplete] = () => {
      this.complete = true
    }
  }

  get isComplete() {
    return this.complete
  }

  public reset(): void {
    this.complete = false
    this.statusCode = 0
    this.statusMessage = ''
    this.headers = []
    this.trailers = []
    this.bodyChunks = []
    this.parser.reinitialize(HTTPParser.RESPONSE)
  }

  private toHeaders(headers: string[]): Headers {
    const result = new Headers()
    for (let i = 0; i < headers.length; i += 2)
      // @ts-expect-error IT WORKS
      result.append(headers[i], headers[i + 1])
    return result
  }

  public parse(input: Buffer) {
    this.parser.execute(input)
    this.parser.finish()
  }

  getResponse() {
    if (!this.complete)
      throw new Error('Could not parse response')

    const body = Buffer.concat(this.bodyChunks)

    return new Response(body, {
      status: this.statusCode,
      statusText: this.statusMessage,
	  headers: this.toHeaders(this.headers),
    })
  }
}

export class SocketRequest {
  public url: string
  public method?: string
  public headers?: Headers
  public body?: string

  constructor(url: string, options: RequestInit) {
    this.url = url
    this.method = options.method!
    this.headers = new Headers(options.headers)
    if (options.body)
      this.body = options.body.toString()
  }

  /** Returns the string representation of the request. */
  public toString() {
    let requestString = `${this.method} ${this.url} HTTP/1.1\r\n`

    if (this.headers) {
      for (const [name, value] of this.headers.entries())
        requestString += `${name}: ${value}\r\n`
    }

    requestString += '\r\n'
    return this.body ? requestString + this.body : requestString
  }
}

// console.log('Example: basic GET request:');
// const requestParser = new RequestParser();
// const parsedRequest = requestParser.parse(Buffer.from(`GET /containers/json HTTP/1.1
// Host: localhost

// `));

// console.log(parsedRequest);

// const responseParser = new ResponseParser();
// const parsedResponse = responseParser.parse(/* your response input here */);
// console.log(parsedResponse);
