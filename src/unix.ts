class Unix {
  private _unix: string
  constructor(socketPath: string = '/var/run/docker.sock') {
    this._unix = socketPath
  }

  public get getUnix() {
    return this._unix
  }

  public setUnix(socketPath: string) {
    this._unix = socketPath
  }
}

export const unix = new Unix()
