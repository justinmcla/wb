class FacilitySerializer
  include JSONAPI::Serializer
  attributes :id, :name, :private, :address
  has_many :floors, serializer: FloorSerializer
  has_many :rooms, serializer: RoomSerializer
  has_one  :address, serializer: AddressSerializer
end
