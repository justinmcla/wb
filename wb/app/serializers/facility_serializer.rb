class FacilitySerializer
  include JSONAPI::Serializer
  attributes :id, :name
  has_one  :address
end
