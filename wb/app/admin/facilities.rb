ActiveAdmin.register Facility do
  scope_to :current_admin_user
  menu priority: 1
  permit_params :name, :private,
    address_attributes: %i[line_1 line_2 city state zip],
    email_attributes: :address,
    phone_attributes: :number
  remove_filter :floors, :rooms, :address, :emails, :phones, :admin_user
end
