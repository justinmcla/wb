class API {
  static base() {
    return 'http://localhost:3000/api/v1'
  }

  static addresses() {
    return `${API.base()}/addresses`
  }

  static facilities() {
    return `${API.base()}/facilities`
  }

  static floors() {
    return `${API.base()}/floors`
  }

  static rooms() {
    return `${API.base()}/rooms`
  }
}
