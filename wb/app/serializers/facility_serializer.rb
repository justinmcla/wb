class FacilitySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_one :address
end
