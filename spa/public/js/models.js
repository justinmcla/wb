class Facility {
  constructor(attributes) {
    const whitelist = ['id', 'name', 'private']
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
    const whitelist = ['id', 'number', 'facility_id']
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }
  render() {
    this.element ||= document.createElement('option')
    this.element.value = this.id
    this.element.innerHTML = this.number
    return this.element // <option id = '#' value = '#'>#</option>
  }
}

class Room {
  constructor(attributes) {
    const whitelist = ['id', 'name', 'floor_id', 'facility_id']
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }

  render() {
    this.element ||= document.createElement('option')
    this.element.value = this.id
    this.element.innerHTML = this.name
    this.element.setAttribute('data-floor-id', this.floor_id)
    this.element.setAttribute('data-facility-id', this.facility_id)
    return this.element
    // <option id = '#' value = 'Room 0' data-floor-id = '#' data-facility-id = '#'>Room 0</option>
  }
}

class Address {
  constructor(attributes) {
    const whitelist = ['line_1', 'line_2', 'city', 'state', 'zip', 'addressable_id', 'addressable_type']
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }

  render() {
    let lines = []

    const lineOne = document.createElement('span')
    lineOne.textContent = this.line_1
    lines.push(lineOne)
    lines.push(document.createElement('br'))

    if (this['line_2']) {
      const lineTwo = document.createElement('span')
      lineTwo.textContent = this.line_2
      lines.push(lineTwo)
      lines.push(document.createElement('br'))
    }

    const lineThree = document.createElement('span')
    lineThree.textContent = `${this.city}, ${this.state} ${this.zip}`
    lines.push(lineThree)
    lines.push(document.createElement('br'))

    return lines
  }
}
