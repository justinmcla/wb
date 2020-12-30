class RoomSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :floor_id, :facility_id
  belongs_to :facility, serializer: FacilitySerializer
  belongs_to :floor, serializer: FloorSerializer
end
