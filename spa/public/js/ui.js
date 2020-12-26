class UI {
  static renderFacilityCard(facility) {
    const address = Address.collection.find( a => a.addressable_id == facility.id).render();
    const addressCard = Component.newCard()
    addressCard.id = 'facilityAddress'
    addressCard.append(...address)
    const side = document.querySelector('#side')
    side.prepend(addressCard)
  }

  static loadFloorsByFacilityId(id) {
    const floors = Floor.collection.filter( f => f.facility_id == id )
    const floorNumbers = document.querySelector('#floorNumbers')
    floors.forEach( floor => floorNumbers.appendChild(floor.render()) )
  }
  //
  static loadFloorRooms(id) {
    const rooms = Room.collection.filter( r => r.floor_id == id )
    const roomNames = document.querySelector('#roomNames')
    rooms.forEach( room => roomNames.appendChild(room.render()) )
  }
}
