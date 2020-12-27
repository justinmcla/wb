class UI {
  static renderFacilityCard(facility) {
    const address = Address.collection.find( a => a.addressable_id == facility.id).render();
    const addressCard = Component.newCard()
    addressCard.id = 'facilityAddress'
    addressCard.append(...address)
    const side = document.querySelector('#side')
    side.prepend(addressCard)
  }

  static loadFloorsByFacilityId(id) {
    const floors = Floor.collection().filter( f => f.facility_id == id )
    floors.forEach( floor => Floor.container().appendChild(floor.render()) )
  }

  static loadFloorRooms(id) {
    const rooms = Room.collection().filter( r => r.floor_id == id )
    rooms.forEach( room => Room.container().appendChild(room.render()) )
  }
  }

  static handleFacilityCodeSubmission(responseJson) {
    const facility = new Facility(responseJson.facility)
    Facility.collection.push(facility)
    const floor = new Floor(responseJson.floor)
    Floor.collection.push(floor)
    const address = new Address(responseJson.address)
    Address.collection.push(address)
    const options = {
      id: responseJson.id,
      name: responseJson.name,
      facility_id: responseJson.facility.id,
      floor_id: responseJson.floor.id
    }
    const room = new Room(options)

    const facilityName = document.querySelector('#facilityName')
    const roomNames = document.querySelector('#roomNames')
    const floorNumbers = document.querySelector('#floorNumbers')

    while(roomNames.firstChild) {
      roomNames.removeChild(roomNames.lastChild);
  static facilityName() {
    return document.querySelector('#facilityName')
  }

    }
    while(floorNumbers.firstChild) {
      floorNumbers.removeChild(floorNumbers.lastChild)
    }

  static disciplines() {
    return document.querySelector('#disciplines')
  }

    document.querySelector('#submitFacilityCode').hidden = true
    document.querySelector('#facilityCode').disabled = true
    document.querySelector('#resetForm').hidden = false
    document.querySelector('#facilityName').value = facility.name
    document.querySelector('#instructions').hidden = true
    UI.renderFacilityCard(facility)
    facilityName.value = facility.name
    facilityName.disabled = true
    floorNumbers.appendChild(floor.render())
    floorNumbers.children.namedItem(floor.id).setAttribute('selected', '')
    floorNumbers.disabled = true
    roomNames.appendChild(room.render())
    roomNames.children.namedItem(room.id).setAttribute('selected', '')
    roomNames.disabled = true
  static description() {
    return document.querySelector('#description')
  }

  static uploads() {
    return document.querySelector('#imageUpload')
  }

  static instructions() {
    return document.querySelector('#instructions')
  }

  static resetButton() {
    return document.querySelector('#resetForm')
  }

  static facilityCode() {
    return document.querySelector('#facilityCode')
  }

  static facilityCodeButton() {
    return document.querySelector('#submitFacilityCode')
  }

  static facilityCard() {
    return document.querySelector('#facilityCard')
  }

  static fileIndicator() {
    return document.querySelector('#fileList')
  }



  }
}
