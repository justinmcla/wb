document.addEventListener('DOMContentLoaded', () => {
  UI.init()
})

UI.get('#resetFormButton').addEventListener('click', e => {
  UI.resetForm()
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
  const code = UI.get('#facilityCode')
  if(code.value != '') {
    code.classList.remove('uk-form-danger')
    UI.get('#passwordForm').dataset.requestType = 'room'
    UI.get('#passwordForm').dataset.requestCode = UI.get('#facilityCode').value
    UIkit.modal(UI.get('#passwordModal')).show()
  } else {
    code.classList.add('uk-form-danger')
  }
})

UI.get('#statusForm').addEventListener('submit', e => {
  e.preventDefault();
  const code = UI.get('#confirmationCode')
  if(code.value != '') {
    code.classList.remove('uk-form-danger')
    UI.get('#passwordForm').dataset.requestType = 'workOrder'
    UI.get('#passwordForm').dataset.requestCode = UI.get('#confirmationCode').value
    UIkit.modal(UI.get('#passwordModal')).show()
  } else {
    code.classList.add('uk-form-danger')
  }
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
          UI.handleCheckWorkOrderSubmission(json)
        }).catch(error => {
          console.error(error)
          UI.get('#passwordError').innerHTML = error
        })
      }
    }
  })
})

UI.get('#resetFormButton').addEventListener('click', e => {
  UI.resetForm()
})

UI.get('#changeWoPassword').addEventListener('submit', e => {
  e.preventDefault()
  const code = UI.get('#submissionConfirmation').innerHTML
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
    if(json.status == 'ok') {
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

UI.get('#submissionModal').addEventListener('hidden', e => {
  UI.get('#woPassword').className = 'uk-input'
  UI.get('#woPassword').value = ''
  UI.get('#woPasswordError').innerHTML = ''
})
