class RoomSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :floor_id, :facility_id
  belongs_to :facility
  belongs_to :floor
end
