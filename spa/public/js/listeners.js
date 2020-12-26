document.addEventListener('DOMContentLoaded', () => {
  Facility.all();
  Address.all();
  Floor.all();
  Room.all();
})

document.addEventListener('input', e => {
  if (e.target.matches('#facilityName')) {
    let options = document.querySelector('#facilities').children;
    let selected = null;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value.toLowerCase() == e.target.value.toLowerCase()) {
        selected = options[i];
      }
    }
    if (selected) {
      document.querySelector('#instructions').hidden = true
      const facility = Facility.findById(selected.id)
      UI.renderFacilityCard(facility)
      document.querySelector('#resetForm').hidden = false
      UI.loadFloorsByFacilityId(facility.id)
      const floorId = document.querySelector('#floorNumbers').value
      UI.loadFloorRooms(floorId)
    } else {
      document.querySelector('#resetForm').hidden = true
      document.querySelector('#instructions').hidden = false;
      document.querySelectorAll('#facilityAddress').forEach( e => e.remove())
      const floorNumbers = document.querySelector('#floorNumbers')
      while(floorNumbers.firstChild) {
        floorNumbers.removeChild(floorNumbers.lastChild);
      }
      while(roomNames.firstChild) {
        roomNames.removeChild(roomNames.lastChild);
      }
    }
  } else if (e.target.matches('#floorNumbers')) {
    const roomNames = document.querySelector('#roomNames')
    while(roomNames.firstChild) {
      roomNames.removeChild(roomNames.lastChild);
    }
    const floorId = e.target.value
    UI.loadFloorRooms(floorId)
  } else if (e.target.matches('#imageUpload')) {
    const indicator = document.querySelector('#fileList')
    if (e.target.files.length > 1) {
      indicator.innerHTML = `${e.target.files.length} images selected`;
    } else {
      indicator.innerHTML = `${e.target.files.length} image selected`;
    }
  }
})

document.addEventListener('click', e => {
  if (e.target.matches('#submitFacilityCode')) {
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
      .then(json => {
        console.log(json);
        UI.handleFacilityCodeSubmission(json);
      })
  }
})
