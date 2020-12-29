document.addEventListener('DOMContentLoaded', () => {
  Facility.all();
  Address.all();
  Floor.all();
  Room.all();
})

UI.facilityName().addEventListener('input', e => {
  const selected = UI.facilityInput(e)
  if (selected) {
    UI.handleFacilityInput(selected)
  } else {
    UI.resetButton().hidden = true
    UI.instructions().hidden = false
    UI.facilityCard().remove()
    UI.clearFloorNumbers()
    UI.clearRoomNames()
    UI.resetAllFormFields()
  }
})

Floor.container().addEventListener('input', e => {
  UI.clearRoomNames()
  UI.loadFloorRooms(e.target.value)
})

UI.uploads().addEventListener('input', e => {
  if (e.target.files.length > 1) {
    UI.fileIndicator().innerHTML = `${e.target.files.length} images selected`;
  } else {
    UI.fileIndicator().innerHTML = `${e.target.files.length} image selected`;
  }
})

UI.facilityCodeButton().addEventListener('click', e => {
  e.preventDefault();
  const code = document.querySelector('#facilityCode').value
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'code': code
    })
  }

  fetch('http://localhost:3000/api/v1/rooms', options)
    .then(response => response.json())
    .then(json => UI.handleFacilityCodeSubmission(json))
})

UI.resetButton().addEventListener('click', e => {
  UI.resetAllFormFields()
})
