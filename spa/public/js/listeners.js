// Grabs all public facility data and loads work order form.
document.addEventListener('DOMContentLoaded', () => {
  UI.init()
})

// Clears form data, removes facility card, shows instructions
UI.get('#resetFormButton').addEventListener('click', e => {
  UI.resetForm()
})

// Grabs actual list node based on what is typed in text field
UI.get('#facilityName').addEventListener('input', e => {
  const selected = UI.getFacilityInput(e)
  selected ? UI.handleFacilityInput(selected) : UI.clearFacilityInput()
})

// Loads rooms by floor (alphabetized)
UI.get('#floorNumbers').addEventListener('input', e => {
  Room.container().innerHTML = ''
  Room.loadByFloor(e.target.value)
})

// Below two methods clear fields and removes validation styles
UI.get('#passwordModal').addEventListener('hidden', e => {
  UI.clearField('#password')
})

UI.get('#subModal').addEventListener('hidden', e => {
  UI.clearField('#woPassword')
})

// Below two methods set password form to grab correct data
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

// Requests token and grabs data based on dataset
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

// Handles new work order submission
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

// Handles password updates for new work orders
UI.get('#changeWoPassword').addEventListener('submit', e => {
  e.preventDefault()
  const code = UI.get('#subConfirmation').innerHTML
  const pass = UI.get('#woPassword').value
  if (pass == '') {
    UI.get('#woPassword').classList.add('uk-form-danger')
    UI.get('#woPasswordError').innerHTML = 'Password must not be blank.'
    return
  }
  WorkOrder.updatePassword(code, pass)
  .then(() => {
    UI.get('#woPassword').classList.add('uk-form-success')
    UI.get('#woPasswordError').innerHTML = 'Password changed.'
  })
  .catch(error => {
    console.error(error)
    UI.get('#woPassword').classList.add('uk-form-danger')
    UI.get('#woPasswordError').innerHTML = error
  })
})
