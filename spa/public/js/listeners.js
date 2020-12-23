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
      let address = Facility.findById(selected.id).address;
      address.element = address.render();
      let side = document.querySelector('#side')
      side.appendChild(address.element)
    } else {
      document.querySelector('#instructions').hidden = false;
      document.querySelectorAll('#facilityAddress').forEach( e => e.remove())
    }
  }
})

