class UI {
  static renderFacilityCard(facility) {
    const address = Address.collection.find( a => a.addressable_id == facility.id).render();
    const addressCard = Component.newCard()
    addressCard.id = 'facilityAddress'
    addressCard.append(...address)
    const side = document.querySelector('#side')
    side.appendChild(addressCard)
  }

  static loadFloorsByFacilityId(id) {
    const floors = Floor.collection.filter( f => f.facility_id == id )
    const floorNumbers = document.querySelector('#floorNumbers')
    floors.forEach( floor => floorNumbers.appendChild(floor.render()) )
  }
  //
  static loadFloorRooms(id) {
    const roomNames = document.querySelector('#roomNames')
    const rooms = floor.rooms
    rooms.forEach( room => roomNames.appendChild(room.render()) )
  }
}
