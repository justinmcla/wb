class UI {

  static get(node) {
    return document.querySelector(node)
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
    UI.get('#woTitle').innerHTML = `${workOrder.discipline} Request #${workOrder.confirmation}`
    UI.get('#woStatus').innerHTML = `STATUS: ${workOrder.status.toUpperCase()}`
    UI.get('#woFacilityName').innerHTML = facility.name
    UI.get('#woFacilityAddress').innerHTML = ''
    UI.get('#woFacilityAddress').appendChild(address.render())
    UI.get('#woFacilityProblemArea').innerHTML = `Floor ${floor.number}, ${room.name}`
    UI.get('#woDescription').innerHTML = workOrder.description
    if (workOrder.response) {UI.get('#woResponse').innerHTML = workOrder.response}

    UIkit.modal(UI.get('#workOrderModal')).show()
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
    UI.facilityCode().classList.remove('uk-form-danger')

    UI.facilityCard().remove()
    UI.fileIndicator().innerHTML = ''
  }
}
