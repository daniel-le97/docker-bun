export interface DockerComposeService {
  image: string
  container_name?: string
  ports?: (string | number)[]
  environment?: Record<string, string>
  volumes?: (string | Record<string, string>)[]
  depends_on?: string[]
  networks?: string[]
  restart?: 'no' | 'always' | 'on-failure' | 'unless-stopped'
  build?: string | {
    context: string
    dockerfile?: string
    args?: Record<string, string>
    labels?: Record<string, string>
  }
  command?: string | string[]
  entrypoint?: string | string[]
  links?: string[]
  hostname?: string
  domainname?: string
  extends?:{file:string, service: string}
  external_links?: string[]
  expose?: (string | number)[]
  extra_hosts?: Record<string, string>
  logging?: string | {
    driver: string
    options?: Record<string, string>
  }
  security_opt?: string[]
  cap_add?: string[]
  cap_drop?: string[]
  tmpfs?: string[]
  devices?: string[]
  sysctls?: Record<string, string>
  labels?: Record<string, string>
  deploy?: {
    mode: 'replicated' | 'global'
    replicas?: number
    resources?: {
      limits?: {
        cpus: string
        memory: string
      }
      reservations?: {
        cpus: string
        memory: string
      }
    }
    restart_policy?: {
      condition: 'none' | 'on-failure' | 'any'
      delay: string
      max_attempts: number
      window: string
    }
    placement?: {
      constraints?: string[]
      preferences?: {
        spread: string
        weight: number
      }[]
    }
    update_config?: {
      parallelism: number
      delay: string
      failure_action: 'pause' | 'continue' | 'rollback'
      monitor: string
      max_failure_ratio: string
      order: 'stop-first' | 'start-first'
    }
    rollback_config?: {
      parallelism: number
      delay: string
      failure_action: 'pause' | 'continue' | 'rollback'
      monitor: string
      max_failure_ratio: string
      order: 'stop-first' | 'start-first'
    }
    labels?: Record<string, string>
  }
  // Add more service-specific properties as needed
}

export interface DockerCompose {
  version: string
  services: {
    [serviceName: string]: DockerComposeService
  }
  networks?: {
    [networkName: string]: {
      external: boolean
    }
  }
  volumes?: {
    [volumeName: string]: string | { driver: string }
  }
  configs?: {
    [configName: string]: string | { source: string; target: string }
  }
  secrets?: {
    [secretName: string]: string | { source: string; target: string }
  }
  // Add more top-level properties as needed
}

export default DockerCompose
