import { readFileSync } from 'node:fs'
import { load } from 'js-yaml'
import type { ServiceSpec } from './src/index.ts'
import { ApiError, Docker } from './src/index.ts'
import { getQueryString } from './src/schema/core/request.ts';

const docker = new Docker()
interface Filters {
  dangling?: boolean
  driver?: string
  label?: string | Record<string, string>
  name?: string
}

// Function to convert the Filters object to a JSON-encoded string
function encodeFilters(filters: Record<string, string>): string {
  const filterStrings: string[] = []

  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      const value = filters[key]
      if (value)

        filterStrings.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }

  return filterStrings.join('&')
}

try {
  const filters = { name: 'project_default' }
  const encodedFilters = encodeURIComponent(JSON.stringify(filters))
  const string = getQueryString({name:'project_default'})
  const networks = await docker.networks.networkList()
  console.log( networks)
}
catch (error) {
  if (error instanceof ApiError)
    console.error('API Error:', error.message)

  else
    console.error('An unexpected error occurred:', error)
}

// const filters = JSON.stringify({ name: "project_default"} as Filters);
// const res = await docker.networks.networkList()
// const res = await docker.networks.networkCreate({Name: 'project_default', 'CheckDuplicate':true})
// const res = await docker.secrets.secretCreate({
//   Name: 'app-key.crt',
//   Labels: {
//     'com.example.some-label': 'some-value',
//     'com.example.some-other-label': 'some-other-value',
//     'foo': 'bar',
//   },
//   Data: 'VEhJUyBJUyBOT1QgQSBSRUFMIENFUlRJRklDQVRFCg==',
//   Driver: {
//     Name: 'secret-bucket',
//     Options: {
//       OptionA: 'value for driver option A',
//       OptionB: 'value for driver option B',
//     },
//   },
//   Templating: {
//     Name: 'some-driver',
//     Options: {
//       OptionA: 'value for driver-specific option A',
//       OptionB: 'value for driver-specific option B',
//     },
//   },
// })
// const res = await docker.images.imageInspect('sha256:ab6510b890a4b32cfb12d620d4f6b301f48ba3958cbc802ccc226b386e209988')
// console.log(res)
