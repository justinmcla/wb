ActiveAdmin.register WorkOrder do
  scope_to :current_admin_user
  menu priority: 2
  permit_params %i[
    status, discipline, description, response, 
    facility_id, room_id, confirmation, password_digest]
  preserve_default_filters!
  filter :facility, collection: proc { current_admin_user.facilities }
  remove_filter :room, :password_digest, :admin_user
end
