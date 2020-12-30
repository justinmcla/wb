class FloorSerializer
  include JSONAPI::Serializer
  attributes :id, :number, :facility_id
  belongs_to :facility, serializer: FacilitySerializer
  has_many   :rooms, serializer: RoomSerializer
end
