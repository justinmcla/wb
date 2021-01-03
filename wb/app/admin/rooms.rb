ActiveAdmin.register Room do
  belongs_to :floor
  belongs_to :facility
  permit_params %i[name aid password_digest floor_id facility_id]
end
