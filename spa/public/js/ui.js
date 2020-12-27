class UI {
  static renderFacilityCard(facility) {
    const addressParagraph = Address.findByFacilityId(facility.id).render();
    const addressCard      = Component.newCard()
    addressCard.id         = 'facilityCard'
    addressCard.appendChild(addressParagraph)
    const side             = document.querySelector('#side')
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

  static facilityInput(e) {
    const options = Facility.container().children
    for (let i = 0; i < options.length; i++) {
      if (options[i].value.toLowerCase() == e.target.value.toLowerCase()) {
        return options[i]
      }
    }
    return false
  }

  static handleFacilityInput(selectedFacility) {
    const facility = Facility.findById(selectedFacility.id)
    UI.instructions().hidden = true
    UI.resetButton().hidden = false
    UI.renderFacilityCard(facility)
    UI.loadFloorsByFacilityId(facility.id)
    UI.loadFloorRooms(Floor.container().value)
  }

  static handleFacilityCodeSubmission(responseJson) {

    // Create new objs based on response

    const facility = new Facility(responseJson.facility)
    const floor    = new Floor(responseJson.floor)
    const address  = new Address(responseJson.address)
    const room     = new Room(responseJson)

    // Hide instructions, disable all pre-loaded form fields, show reset button

    UI.clearFloorNumbers()
    UI.clearRoomNames()
    UI.facilityCodeButton().hidden = true
    UI.facilityCode().disabled = true
    UI.facilityCodeButton().hidden = false
    UI.facilityName().value = facility.name
    UI.instructions().hidden = true
    UI.renderFacilityCard(facility)
    UI.resetButton().hidden = false

    // Load form data based on created objs

    UI.facilityName().value = facility.name
    UI.facilityName().disabled = true

    Floor.container().appendChild(floor.render())
    Floor.container().children.namedItem(floor.id).setAttribute('selected', '')
    Floor.container().disabled = true

    Room.container().appendChild(room.render())
    Room.container().children.namedItem(room.id).setAttribute('selected', '')
    Room.container().disabled = true
  }

  static facilityName() {
    return document.querySelector('#facilityName')
  }

  static clearFloorNumbers() {
    while(Floor.container().firstChild) {
      Floor.container().removeChild(Floor.container().lastChild)
    }
  }

  static clearRoomNames() {
    while(Room.container().firstChild) {
      Room.container().removeChild(Room.container().lastChild)
    }
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
