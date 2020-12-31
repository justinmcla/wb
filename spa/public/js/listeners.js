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
    UI.resetButton().hidden = true
    UI.instructions().hidden = false
    if (UI.facilityCard()) { UI.facilityCard().remove() }
    UI.clearFloorNumbers()
    UI.clearRoomNames()
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
  const code = document.querySelector('#facilityCode').value
UI.resetButton().addEventListener('click', e => {
  UI.resetAllFormFields()
})
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'confirmation': confirmation
    })
  }

  fetch(API.workOrders(confirmation))
    .then(response => response.json())
    .then(json => UI.handleFacilityCodeSubmission(json))
})

UI.resetButton().addEventListener('click', e => {
  UI.resetAllFormFields()
})
