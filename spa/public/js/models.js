class Facility {
  constructor(attributes) {
    let whitelist = ['id', 'name', 'private']
    whitelist.forEach(attr => this[attr] = attributes[attr])
    this['address'] = new Address(attributes['address'])
  }

  static datalist() {
    return this.list ||= document.querySelector('#facilities')
  }

  static all() {
    return fetch('http://localhost:3000/api/v1/facilities')
    .then(res => res.json())
    .then(facilitiesJson => {
      this.collection = facilitiesJson.map(attr => new Facility(attr))
      console.log(this.collection)
      let facilityNames = this.collection.map(facility => facility.render())
      this.datalist().append(...facilityNames)
      return this.collection
    })
  }

  static findById(id) {
    return this.collection.find(facility => facility.id == id)
  }

  render() {
    this.element ||= document.createElement('option')
    this.element.id = this.id
    this.element.value = this.name
    return this.element // <option id = '#' value = 'Some Facility'></option>
  }
}

class Floor {
  constructor(attributes) {
    let whitelist = ['id', 'number', 'facility_id']
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }
}

class Room {
  constructor(attributes) {
    let whitelist = ['id', 'name', 'floor_id', 'facility_id']
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }
}

class Address {
  constructor(attributes) {
    let whitelist = ['line_1', 'line_2', 'city', 'state', 'zip', 'addressable_id', 'addressable_type']
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }
}
