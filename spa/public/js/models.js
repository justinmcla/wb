class Facility {
  constructor(attributes) {
    let whitelist = ['id', 'name', 'private']
    whitelist.forEach(attr => this[attr] = attributes[attr])
    this['address'] = new Address(attributes['address'])
  }

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
