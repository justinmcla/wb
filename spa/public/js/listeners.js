document.addEventListener('DOMContentLoaded', () => {
  Facility.all();
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
      UI.loadFacilityFloors(facility)
      const floorId = document.querySelector('#floorNumbers').value
      const floor = Floor.findById(floorId)
      UI.loadFloorRooms(floor)
    } else {
      document.querySelector('#instructions').hidden = false;
      document.querySelectorAll('#facilityAddress').forEach( e => e.remove())
      const floorNumbers = document.querySelector('#floorNumbers')
      while(floorNumbers.firstChild) {
        floorNumbers.removeChild(floorNumbers.lastChild);
      }
    }
  }
})
