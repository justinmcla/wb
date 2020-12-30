class WorkOrderSerializer
  include JSONAPI::Serializer

  attributes :id, :status, :discipline, :description, :response,
             :confirmation, :facility_id, :room_id

  attribute :floor do |object|
    { id:          object.room.floor.id,
      number:      object.room.floor.number,
      facility_id: object.room.floor.facility_id }
  end

  belongs_to :facility, serializer: FacilitySerializer
  belongs_to :room, serializer: RoomSerializer
  
end
