document.addEventListener('DOMContentLoaded', () => {
  Facility.all();
  Address.all();
  Floor.all();
  Room.all();
})

UI.get('#facilityName').addEventListener('input', e => {
  const selected = UI.facilityInput(e)
  if (selected) {
    UI.handleFacilityInput(selected)
  } else {
    UI.get('#resetFormButton').hidden = true
    UI.get('#instructions').hidden = false
    if (UI.get('#facilityCard')) { UI.get('#facilityCard').remove() }
    Floor.container().innerHTML = ''
    Room.container().innerHTML  = ''
  }
})

Floor.container().addEventListener('input', e => {
  Room.container().innerHTML = ''
  Room.loadByFloor(e.target.value)
})

UI.get('#imageUpload').addEventListener('input', e => {
  if (e.target.files.length > 1) {
    UI.get('#fileList').innerHTML = `${e.target.files.length} images selected`;
  } else {
    UI.get('#fileList').innerHTML = `${e.target.files.length} image selected`;
  }
})

UI.get('#facilityCodeForm').addEventListener('submit', e => {
  e.preventDefault();
  UI.get('#passwordForm').dataset.requestType = 'room'
  UIkit.modal(UI.get('#passwordModal')).show()
})

UI.get('#statusForm').addEventListener('submit', e => {
  e.preventDefault();
  UI.get('#passwordForm').dataset.requestType = 'workOrder'
  UIkit.modal(UI.get('#passwordModal')).show()
})

})
