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

UI.get('#newWorkOrderForm').addEventListener('submit', e => {
  e.preventDefault();
  let data = new FormData(e.target)
  data.append('facility_id', Facility.findByName(UI.get('#facilityName').value).id)
  let files = UI.get('#imageUpload').files
  for(let i = 0; i < files.length; i++) {
    data.append(`images[${i}]`, files[i])
  }
  WorkOrder.create(data).then(workOrder => {
    if(workOrder) {
      UI.resetForm()
      UI.handleNewWorkOrder(workOrder)
    } else {
      return Promise.reject('Unable to create work order')
    }
  }).catch(error => {
    console.error(error)
  })
})

UI.get('#passwordModal').addEventListener('hidden', e => {
  UI.get('#password').value = ''
  UI.get('#password').className = 'uk-input'
  UI.get('#passwordError').innerHTML = ''
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
