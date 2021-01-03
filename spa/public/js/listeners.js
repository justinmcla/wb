document.addEventListener('DOMContentLoaded', () => {
  UI.init()
})

UI.get('#resetFormButton').addEventListener('click', e => {
  UI.resetForm()
})

UI.get('#facilityName').addEventListener('input', e => {
  const selected = UI.getFacilityInput(e)
  selected ? UI.handleFacilityInput(selected) : UI.clearFacilityInput()
})

UI.get('#floorNumbers').addEventListener('input', e => {
  Room.container().innerHTML = ''
  Room.loadByFloor(e.target.value)
})

UI.get('#passwordModal').addEventListener('hidden', e => {
  UI.clearField('#password')
})

UI.get('#subModal').addEventListener('hidden', e => {
  UI.clearField('#woPassword')
})

UI.get('#facilityCodeForm').addEventListener('submit', e => {
  e.preventDefault();
  const code = UI.get('#facilityCode')
  UI.populatePasswordModal(code, 'room')
})

UI.get('#statusForm').addEventListener('submit', e => {
  e.preventDefault();
  const code = UI.get('#confirmationCode')
  UI.populatePasswordModal(code, 'workOrder')
})

UI.get('#passwordForm').addEventListener('submit', e => {
  e.preventDefault();
  const requestType = e.target.dataset.requestType
  const requestCode = e.target.dataset.requestCode
  const password    = UI.get('#password').value

  JsonWebToken.requestToken(requestType, requestCode, password).then(() => {
    if(JsonWebToken.get()) {
      if(requestType == 'room') {
        Room.show(requestCode).then(json => {
          UIkit.modal(UI.get('#passwordModal')).hide()
          UI.handleFacilityCodeSubmission(json)
        }).catch(error => {
          console.error(error)
          UI.get('#passwordError').innerHTML = error
        })
      } else if (requestType == 'workOrder') {
        WorkOrder.show(requestCode).then(json => {
          UIkit.modal(UI.get('#passwordModal')).hide()
          UI.handleStatusCheck(json)
        }).catch(error => {
          console.error(error)
          UI.get('#passwordError').innerHTML = error
        })
      }
    }
  })
})

UI.get('#newWorkOrderForm').addEventListener('submit', e => {
  e.preventDefault()
  let data = new FormData(e.target)
  data.set('facility_id', Facility.findByName(UI.get('#facilityName').value).id)
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

UI.get('#changeWoPassword').addEventListener('submit', e => {
  e.preventDefault()
  const code = UI.get('#subConfirmation').innerHTML
  const pass = UI.get('#woPassword').value
  fetch(API.workOrders(code), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': JsonWebToken.get()
    }, body: JSON.stringify({
      'code': code,
      'password': pass
    })
  }).then(res => res.json())
  .then(json => {
    if(json.status == 200) {
      JsonWebToken.set(json.token)
      UI.get('#woPassword').classList.add('uk-form-success')
      UI.get('#woPasswordError').innerHTML = 'Password changed.'
    } else {
      return Promise.reject(json.errors)
    }
  })
  .catch(error => {
    console.error(error)
    UI.get('#woPassword').classList.add('uk-form-danger')
    UI.get('#woPasswordError').innerHTML = error
  })
})
