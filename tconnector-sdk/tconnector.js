class Api {
  constructor(tconnector) {
    this.tconnector = tconnector
    this.isHFT = tconnector.isHFT
    this.commands = [
      'server_status',
      'get_securities',
      'get_portfolio',
      'get_forts_positions',
      'gethistorydata',
      'neworder',
      'newstoporder',
      'newcondorder',
      'cancelorder',
      'cancelstoporder',
      'connect',
      'change_pass',
    ]
    this.#load()
  }
  async #request(params) {
    const { host, port } = this.tconnector
    const url = new URL(`http://${host}:${port}`)
    url.search = new URLSearchParams({
      ...params,
    })
    try {
      const response = await fetch(url, {
        method: 'POST',
      })
      return response.text()
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async #call(params) {
    const { HftOrNot, account } = this.tconnector
    const res = await this.#request({ HftOrNot, ...params })
    return res
    //return JSON.parse(res)
  }

  #scaffold(command) {
    return (args) => {
      const { HftOrNot } = this.tconnector
      return this.#call({
        command,
        ...args,
      })
    }
  }
  #load() {
    for (const command of this.commands) {
      this[command] = this.#scaffold(command)
    }
  }
}

class Tconnector {
  constructor({ isHFT, host, port }) {
    this.createdTc = null
    this.isHFT = isHFT
    this.host = host
    this.port = port
    this.api = new Api(this)
  }
  static getTc(...args) {
    if (!this.createdTc) this.createdTc = new Tconnector(...args)
    return this.createdTc
  }
  get HftOrNot() {
    return this.isHFT ? 'Hft' : 'NotHft'
  }
}

export default Tconnector
