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

  static handleNewWorkOrder(workOrder) {
    const facility = Facility.findById(workOrder.facility_id)
    const address  = Address.findByFacilityId(facility.id)
    const room     = Room.findById(workOrder.room_id)
    const floor    = Floor.findById(room.floor_id)

    UI.get('#submissionResult').innerHTML = `${workOrder.discipline} Request Received`
    UI.get('#submissionConfirmation').innerHTML = workOrder.confirmation
    UI.get('#subFacilityName').innerHTML = facility.name
    UI.get('#subFacilityAddress').innerHTML = ''
    UI.get('#subFacilityAddress').appendChild(address.render())
    UI.get('#subFacilityProblemArea').innerHTML = `Floor ${floor.number}, ${room.name}`
    UI.get('#subDescription').innerHTML = workOrder.description

    UIkit.modal(UI.get('#submissionModal')).show()
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
    UI.get('#instructions').hidden = true
    UI.get('#resetFormButton').hidden = false
    UI.get('#side').prepend(facility.renderCard())
    Floor.loadByFacilityId(facility.id)
    Room.loadByFloor(Floor.container().value)
  }

  static handleFacilityCodeSubmission(resp) {

    // Create new objs based on response

    const facility = new Facility(resp.included[0].attributes)
    const floor    = new Floor(resp.included[1].attributes)
    const address  = new Address(resp.included[0].attributes.address)
    const room     = new Room(resp.data.attributes)

    // Hide instructions, disable all pre-loaded form fields, show reset button

    Floor.container().innerHTML = ''
    Room.container().innerHTML  = ''
    UI.get('#facilityCodeFormSubmit').hidden = true
    UI.get('#facilityCode').disabled = true
    UI.get('#facilityCodeFormSubmit').hidden = false
    UI.get('#facilityName').value = facility.name
    UI.get('#instructions').hidden = true
    UI.get('#side').prepend(facility.renderCard())
    UI.get('#resetFormButton').hidden = false

    // Load form data based on created objs

    UI.get('#facilityName').value = facility.name
    UI.get('#facilityName').setAttribute('readonly', '')

    Floor.container().appendChild(floor.render())
    Floor.container().children.namedItem(floor.id).setAttribute('selected', '')
    Floor.container().setAttribute('readonly', '')

    Room.container().appendChild(room.render())
    Room.container().children.namedItem(room.id).setAttribute('selected', '')
    Room.container().setAttribute('readonly', '')
  }

  static resetForm() {
    UI.get('#facilityCard').remove()
    UI.get('#fileList').innerHTML = ''
    Floor.container().innerHTML = ''
    Floor.container().removeAttribute('readonly')
    Room.container().innerHTML  = ''
    Room.container().removeAttribute('readonly')
    UI.get('#facilityName').value = ''
    UI.get('#facilityName').removeAttribute('readonly')
    UI.get('#disciplines').value  = 'Carpentry'
    UI.get('#description').value  = ''
    UI.get('#imageUpload').value  = ''
    UI.get('#facilityCode').value = ''
    UI.get('#facilityCode').disabled = false
    UI.get('#instructions').hidden           = false
    UI.get('#resetFormButton').hidden        = true
    UI.get('#facilityCodeFormSubmit').hidden = false
    UI.get('#facilityCode').classList.remove('uk-form-danger')
  }
}
