class JsonWebToken {

  /*
  For the purposes of security, JWTs will be saved in memory.
  This is to ensure they are cleared upon a page refresh. JWTs
  are only necessary to read data and submit certain forms.

  All JWTs will expire in 30 minutes on the server.
  This data does not need to persist beyond a refresh.
  */

  static get() {
    return this.token
  }

  static set(token) {
    this.token = token
  }

  static clear() {
    this.token = null
  }

  static fetchToken(requestType, code, password) {
    this.clear()

    return fetch(API.auth(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, body: JSON.stringify({
        'request_type': requestType,
        'code': code,
        'password': password
      })
    }).then(res => res.json())
      .then(json => {
        if (json.status == 'ok') {
          return json
        } else {
          return Promise.reject(json.errors)
        }
      })
      .then(json => {
        JsonWebToken.set(json.token)
        return json
      })
      .catch(error => {
        console.error(error)
        document.querySelector('#password').classList.add('uk-form-danger')
      })
  }
}
