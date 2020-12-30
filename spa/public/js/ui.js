class UI {
  static renderFacilityCard(facility, image) {
    const addressParagraph = Address.findByFacilityId(facility.id).render();
    const addressCard      = Component.newCard()
    addressCard.id         = 'facilityCard'
    if (image) { addressCard.appendChild(image) }
    addressCard.appendChild(addressParagraph)
    const side             = document.querySelector('#side')
    side.prepend(addressCard)
  }

  static handleCheckWorkOrderSubmission(resp) {
    const facility = Facility.findOrCreate(resp.included[0].attributes)
    const address  = Address.findOrCreate(resp.included[0].attributes.address)
    const floor    = Floor.findOrCreate(resp.data.attributes.floor)
    const room     = Room.findOrCreate(resp.included[1].attributes)
    const workOrder = new WorkOrder(resp.data.attributes)
    UI.renderWorkOrder(workOrder, facility, address, floor, room)
  }

  static renderWorkOrder(workOrder, facility, address, floor, room) {
    UI.woTitle().innerHTML = `${workOrder.discipline} Request #${workOrder.confirmation}`
    UI.woStatus().innerHTML = `STATUS: ${workOrder.status.toUpperCase()}`
    UI.woFacilityName().innerHTML = facility.name
    UI.woFacilityAddress().innerHTML = ''
    UI.woFacilityAddress().appendChild(address.render())
    UI.woFacilityProblemArea().innerHTML = `Floor ${floor.number}, ${room.name}`
    UI.woDescription().innerHTML = workOrder.description
    if (workOrder.response) {UI.woResponse().innerHTML = workOrder.response}

    UIkit.modal(UI.workOrderModal()).show()
  }

  static woTitle() {
    return document.querySelector('#woTitle')
  }

  static woStatus() {
    return document.querySelector('#woStatus')
  }

  static woFacilityName() {
    return document.querySelector('#woFacilityName')
  }

  static woFacilityAddress() {
    return document.querySelector('#woFacilityAddress')
  }

  static woFacilityProblemArea() {
    return document.querySelector('#woFacilityProblemArea')
  }

  static woDescription() {
    return document.querySelector('#woDescription')
  }

  static woResponse() {
    return document.querySelector('#woResponse')
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

  static handleFacilityCodeSubmission(resp) {

    // Create new objs based on response

    const facility = new Facility(resp.included[0].attributes)
    const floor    = new Floor(resp.included[1].attributes)
    const address  = new Address(resp.included[0].attributes.address)
    const room     = new Room(resp.data.attributes)

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

  static description() {
    return document.querySelector('#description')
  }

  static existingWorkOrderForm() {
    return document.querySelector('#existingWorkOrderForm')
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

  static facilityCodeForm() {
    return document.querySelector('#facilityCodeForm')
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

  static workOrderCode() {
    return document.querySelector('#workOrderCode')
  }

  static workOrderModal() {
    return document.querySelector('#workOrderModal')
  }

  static resetAllFormFields() {
    UI.facilityName().value = ''
    UI.facilityName().disabled = false
    UI.clearFloorNumbers()
    Floor.container().disabled = false
    UI.clearRoomNames()
    Room.container().disabled = false
    UI.disciplines().value = 'Carpentry'
    UI.description().value = ''
    UI.uploads().value = ''

    UI.instructions().hidden = false
    UI.resetButton().hidden = true
    UI.facilityCodeButton().hidden = false
    UI.facilityCode().value = ''
    UI.facilityCode().disabled = false

    UI.facilityCard().remove()
    UI.fileIndicator().innerHTML = ''
  }
}
