class Facility {

  // Automatically caches every new Facility instance
  constructor(attributes) {
    const whitelist = ['id', 'name']
    whitelist.forEach(attr => this[attr] = attributes[attr])
    Facility.collection().push(this)
  }

  // Returns the DOM parent DOM node for all facilities
  static container() {
    return this.c ||= document.querySelector('#facilities')
  }

  // Renders each facility in collection and appends to the parent node.
  static load() {
    this.collection().forEach(facility => {
      this.container().appendChild(facility.render())
    })
  }

  // Returns the Facility cache
  static collection() {
    return this.list ||= []
  }

  // Fetches all public facilities, creates objs, and loads them to DOM
  static all() {
    return fetch(API.facilities())
      .then(res => res.json())
      .then(facilities => {
        facilities.forEach(attr => new Facility(attr))
        this.load()
        return this.collection()
      })
  }

  // Finds element in cache that matches passed in ID
  static findById(id) {
    return this.collection().find(facility => facility.id == id)
  }

  // Finds element in cache that matches passed in name
  static findByName(name) {
    return this.collection().find(facility => facility.name == name)
  }

  // Finds Facility object if exists, or creates new one
  static findOrCreate(object) {
    return Facility.findById(object.id) || new Facility(object)
  }

  // Returns facility option node to be appended to DOM
  render() {
    this.element ||= document.createElement('option')
    this.element.id    = this.id
    this.element.value = this.name
    return this.element
    // <option id = '#' value = 'Some Facility'></option>
  }

  // Returns facility card with address
  renderCard() {
    this.card ||= document.createElement('div')
    this.card.classList.add(...['uk-card', 'uk-card-body', 'uk-card-default'])
    this.card.id = 'facilityCard'
    this.card.appendChild(Address.findByFacilityId(this.id).render())
    return this.card
  }
}

class Floor {

  // Automatically caches each new Floor instance
  constructor(attributes) {
    const whitelist = ['id', 'number', 'facility_id']
    whitelist.forEach(attr => this[attr] = attributes[attr])
    Floor.collection().push(this)
  }

  // Returns Floor cache
  static collection() {
    return this.list ||= []
  }

  // Returns the DOM parent node element
  static container() {
    return this.c ||= document.querySelector('#floorNumbers')
  }

  // Fetches floors for public facilities
  static all() {
    return fetch(API.floors())
      .then(res => res.json())
      .then(floors => {
        floors.forEach(attr => new Floor(attr))
        return this.collection()
      })
  }

  // Finds element in cache that matches passed in ID
  static findById(id) {
    return this.collection().find(floor => floor.id == id)
  }

  // Loads floors based on selected facility
  static loadByFacilityId(id) {
    const floors = this.collection().filter(f => f.facility_id == id)
    floors.forEach(floor => this.container().appendChild(floor.render()))
  }

  // Finds or creates a floor object based on passed in object
  static findOrCreate(object) {
    return Floor.findById(object.id) || new Floor(object)
  }

  // Returns floor node element to be appended to DOM
  render() {
    this.element ||= document.createElement('option')
    this.element.id        = this.id
    this.element.value     = this.id
    this.element.innerHTML = this.number
    return this.element // <option id = '#' value = '#'>#</option>
  }
}

class Room {

  // Automatically caches each new Room instance
  constructor(attributes) {
    const whitelist = ['id', 'name', 'floor_id', 'facility_id']
    whitelist.forEach(attr => this[attr] = attributes[attr])
    Room.collection().push(this)
  }

  // Fetches rooms for public facilities, creates new rooms
  static all() {
    return fetch(API.rooms())
      .then(res => res.json())
      .then(rooms => {
        rooms.forEach(attr => new Room(attr))
        return this.collection()
      })
  }

  // Returns room cache
  static collection() {
    return this.list ||= []
  }

  // Returns room parent node element
  static container() {
    return this.c ||= document.querySelector('#roomNames');
  }

  // Returns room whose id matches the passed in id
  static findById(id) {
    return this.collection().find(room => room.id == id)
  }

  // Finds or creates new Room based on passed in object
  static findOrCreate(object) {
    return Room.findById(object.id) || new Room(object)
  }

  // Loads rooms based on selected floor
  static loadByFloor(id) {
    const rooms = Room.collection().filter(r => r.floor_id == id)
    const sortedRooms = rooms.sort((a, b) => (a.name > b.name) ? 1 : -1)
    sortedRooms.forEach(room => Room.container().appendChild(room.render()))
  }

  // Grabs room information using JWT
  static show(code) {
    return fetch(API.rooms(code), {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': JsonWebToken.get()
        }
      }).then(res => res.json())
      .then(json => {
        if (json.status == 422) {
          return Promise.reject(json.errors)
        }
        return json
      })
      .catch(error => {
        console.error(error)
        document.querySelector('#passwordError').innerHTML = error
        document.querySelector('#password').classList.add('uk-form-danger')
      })
  }

  // Returns option node element to be appended to the DOM
  render() {
    this.element ||= document.createElement('option')
    this.element.id        = this.id
    this.element.value     = this.id
    this.element.innerHTML = this.name
    this.element.setAttribute('data-floor-id', this.floor_id)
    this.element.setAttribute('data-facility-id', this.facility_id)
    return this.element
    // <option id = '#' value = 'Room 0' data-floor-id = '#' data-facility-id = '#'>Room 0</option>
  }
}

class Address {

  // Automatically caches each new Address
  constructor(attributes) {
    const whitelist = ['id', 'line_1', 'line_2', 'city', 'state', 'zip', 'addressable_id']
    whitelist.forEach(attr => this[attr] = attributes[attr])
    Address.collection().push(this)
  }

  // Fetches all addresses for public facilities
  static all() {
    return fetch(API.addresses())
      .then(res => res.json())
      .then(addresses => {
        addresses.forEach(attr => new Address(attr))
        return this.collection()
      })
  }

  // Finds or creates Address objects based on passed in object
  static findOrCreate(object) {
    return Address.findById(object.id) || new Address(object)
  }

  // Returns address cache
  static collection() {
    return this.list ||= []
  }

  // Returns parent node element
  static container() {
    return this.c ||= document.querySelector('#facilityAddress')
  }

  // Finds Address by id
  static findById(id) {
    return this.collection().find(address => address.id == id)
  }

  // Returns element whose addressable id matches the passed in id
  static findByFacilityId(id) {
    return this.collection().find(address => address.addressable_id == id)
  }

  // Returns paragraph element to be appended to DOM
  render() {
    if (this.element) { return this.element }
    this.element    = document.createElement('p')
    this.element.id = this.id
    if (this.line_2) { this.element.innerHTML = `
        <span>${this.line_1}</span><br>
        <span>${this.line_2}</span><br>
        <span>${this.city}, ${this.state} ${this.zip}</span><br>
    `} else { this.element.innerHTML = `
        <span>${this.line_1}</span><br>
        <span>${this.city}, ${this.state} ${this.zip}</span><br>
    `}
    return this.element
    // <p id = '#'>
    //   Sample Address
    //   Line 2
    //   City, State Zip
    // </p>
  }
}

class WorkOrder {

  // Creates and caches work order
  constructor(attributes) {
    let whitelist = [
      'id', 'status', 'discipline', 'description',
      'response', 'facility_id', 'room_id', 'confirmation'
    ]
    whitelist.forEach(attr => this[attr] = attributes[attr])
    WorkOrder.collection().push(this)
  }

  // Returns work order cache
  static collection() {
    return this.list ||= []
  }

  // Grabs work order data from server
  static show(code) {
    return fetch(API.workOrders(code), {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': JsonWebToken.get()
        }
      }).then(res => res.json())
      .then(json => {
        if (json.status == 422) {
          return Promise.reject(json.errors)
        } else {
          return json
        }
      }).catch(error => {
        console.error(error)
        document.querySelector('#passwordError').innerHTML = error
        document.querySelector('#password').classList.add('uk-form-danger')
      })
  }

  // Posts form data to server to be created, then creates new object on client side
  static create(data) {
    return fetch(API.workOrders(), {
        method: 'POST',
        headers: {
          'Authorization': JsonWebToken.get()
        },
        body: data
      }).then(res => res.json())
      .then(json => {
        if (json.status == 200) {
          JsonWebToken.set(json.token)
          return new WorkOrder(json.data.data.attributes)
        } else {
          return Promise.reject(json.errors)
        }
      }).catch(error => {
        console.error(error)
        UI.get('#alertError').innerHTML = error
        UIkit.modal(UI.get('#alertModal')).show()
      })
  }

  static updatePassword(code, pass) {
    return fetch(API.workOrders(code), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JsonWebToken.get()
      }, body: JSON.stringify({
        'code': code,
        'password': pass
      })
    }).then(res => res.json())
    .then(json => {
      if (json.status == 200) {
        JsonWebToken.set(json.token)
        return json
      } else {
        return Promise.reject(json.errors)
      }
    })
  }
}
