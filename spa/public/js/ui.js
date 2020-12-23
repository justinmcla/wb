class UI {
  static renderFacilityCard(facility) {
    const address = facility.address.render();
    const addressCard = Component.newCard()
    addressCard.id = 'facilityAddress'
    addressCard.append(...address)
    const side = document.querySelector('#side')
    side.appendChild(addressCard)
  }

  static loadFacilityFloors(facility) {
    const floorNumbers = document.querySelector('#floorNumbers')
    const floors = facility.floors
    floors.forEach( floor => floorNumbers.appendChild(floor.render()) )
  }

  static loadFloorRooms(floor) {
    const roomNames = document.querySelector('#roomNames')
    const rooms = floor.rooms
    rooms.forEach( room => roomNames.appendChild(room.render()) )
  }
}
