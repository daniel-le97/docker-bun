
# docker-bun 

## Getting Started

this project was made because no existing node docker packages work in bun

The docker Api specification was used to generate the API

API endpoints with steams do not yet work as i do not yet understand how all of buns api's work
most have a paramater that disables streams


To install dependencies:

```bash
bun add docker-bun
```

Usage

```js
import { Docker } from 'docker-bun'

const docker = new Docker()
// or

const docker = new Docker(opts)

// get all containers
const containers = await docker.container.containerList()
```
# Caveats

This uses bun to connect to dockers unix socket

other methods have not been sought out yet

Currently the only configuration is 
```js
export interface OpenAPIConfig {
  BASE: string
  VERSION: string
  WITH_CREDENTIALS: boolean
  CREDENTIALS: 'include' | 'omit' | 'same-origin'
  TOKEN?: string | Resolver<string> | undefined
  USERNAME?: string | Resolver<string> | undefined
  PASSWORD?: string | Resolver<string> | undefined
  HEADERS?: Headers | Resolver<Headers> | undefined
  ENCODE_PATH?: ((path: string) => string) | undefined
};

export const OpenAPI: OpenAPIConfig = {
  BASE: '/v1.43',
  VERSION: '1.43',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
}

// new Docker(OpenAPI)
```

