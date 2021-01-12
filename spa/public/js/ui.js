class UI {
  /* GETTERS
  Quick ways to grab desired nodes
  */

  // QuerySelector wrapper
  static get(node) {
    return document.querySelector(node)
  }

  // Pulls option node from datalist based on text input
  static getFacilityInput(e) {
    const options = Facility.container().children
    for (let i = 0; i < options.length; i++) {
      if (options[i].value.toLowerCase() == e.target.value.toLowerCase()) {
        return options[i]
      }
    }
    return false
  }

  // Gets and loads objects to DOM
  static init() {
    Facility.all()
    Address.all()
    Room.all()
    Floor.all()
  }

  /* HANDLERS
  Finds or creates objects based on response data,
  hands off to render functions
  */
  static handleStatusCheck(resp) {
    const workOrder = new WorkOrder(resp.data.attributes)
    const address   = Address.findOrCreate(resp.included[0].attributes)
    const facility  = Facility.findOrCreate(resp.included[1].attributes)
    const floor     = Floor.findOrCreate(resp.included[2].attributes)
    const room      = Room.findOrCreate(resp.included[3].attributes)
    UI.renderStatusCheck(workOrder, facility, address, floor, room)
  }

  static handleNewWorkOrder(workOrder) {
    const facility = Facility.findById(workOrder.facility_id)
    const address  = Address.findByFacilityId(facility.id)
    const room     = Room.findById(workOrder.room_id)
    const floor    = Floor.findById(room.floor_id)
    UI.renderNewWorkOrder(workOrder, facility, address, room, floor)
  }

  static handleFacilityInput(input) {
    const facility = Facility.findById(input.id)
    UI.displayFacility(facility)
    UI.renderOptions(facility)
  }

  static handleFacilityCodeSubmission(resp) {
    const room     = new Room(resp.data.attributes)
    const address  = new Address(resp.included[0].attributes)
    const facility = new Facility(resp.included[1].attributes)
    const floor    = new Floor(resp.included[2].attributes)
    UI.populateForm(facility, room, floor)
  }

  /* RENDERERS & TOGGLERS
  Takes in objects from handlers and renders them to the DOM as appropriate
  */

  static renderOptions(facility) {
    Floor.loadByFacilityId(facility.id)
    Room.loadByFloor(Floor.container().value)
  }

  static renderStatusCheck(workOrder, facility, address, floor, room) {
    UI.get('#statusModalHeader').innerHTML = `
      <h2 class = 'uk-modal-title'>
        ${workOrder.discipline} Request #${workOrder.confirmation}
      </h2>
      <span>STATUS: ${workOrder.status.toUpperCase()}</span>`

    UI.get('#statusModalBody').innerHTML = `
      <p>
        ${facility.name}<br>
        ${address.render().outerHTML}
        Floor ${floor.number}, ${room.name}<br><br>
        Problem:<br>
        ${workOrder.description}<br><br>
        Response:<br>
        ${workOrder.response}<br>
      </p>`

    UIkit.modal(UI.get('#statusModal')).show()
  }

  static renderNewWorkOrder(workOrder, facility, address, room, floor) {
    UI.get('#subModalHeader').innerHTML = `
      <h2 class = 'uk-modal-title'>${workOrder.discipline} Request Received</h2><br>
      Confirmation #: <span id = 'subConfirmation'>${workOrder.confirmation}</span>`

    UI.get('#subData').innerHTML = `
        ${facility.name}
        ${address.render().outerHTML}
        Floor ${floor.number}, ${room.name}<br><br>
        Problem:<br>
        ${workOrder.description}<br>`

    UIkit.modal(UI.get('#subModal')).show()
  }

  static clearFacilityInput() {
    UI.get('#resetFormButton').hidden = true
    UI.get('#instructions').hidden = false
    if (UI.get('#facilityCard')) { UI.get('#facilityCard').remove() }
    Floor.container().innerHTML = ''
    Room.container().innerHTML  = ''
  }

  static clearField(formField) {
    const field = UI.get(formField)
    const error = UI.get(`${formField}Error`)
    field.value = ''
    field.className = 'uk-input'
    if(error) { error.innerHTML = '' }
  }

  static displayFacility(facility) {
    UI.get('#instructions').hidden    = true
    UI.get('#resetFormButton').hidden = false
    UI.get('#side').prepend(facility.renderCard())
  }

  static populatePasswordModal(code, opt) {
    if(code.value != '') {
      code.classList.remove('uk-form-danger')
      UI.get('#passwordForm').dataset.requestType = opt
      UI.get('#passwordForm').dataset.requestCode = code.value
      UIkit.modal(UI.get('#passwordModal')).show()
    } else {
      code.classList.add('uk-form-danger')
    }
  }

  static populateForm(facility, room, floor) {
    UI.get('#facilityName').value = facility.name
    UI.get('#facilityName').setAttribute('readonly', '')

    Floor.container().innerHTML = ''
    Floor.container().appendChild(floor.render())
    Room.container().innerHTML = ''
    Room.container().appendChild(room.render())

    UI.get('#facilityCodeForm').hidden = true
    UI.get('#resetFormButton').hidden  = false
    UI.displayFacility(facility)
  }

  static resetForm() {
    UI.get('#newWorkOrderForm').reset()
    UI.get('#facilityCodeForm').reset()
    UI.get('#statusForm').reset()
    UI.get('#facilityName').removeAttribute('readonly')

    Floor.container().innerHTML = ''
    Room.container().innerHTML  = ''

    UI.get('#instructions').hidden     = false
    UI.get('#resetFormButton').hidden  = true
    UI.get('#facilityCodeForm').hidden = false

    UI.get('#facilityCard').remove()
    UI.get('#facilityCode').classList.remove('uk-form-danger')
  }
}
