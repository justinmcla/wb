ActiveAdmin.register Floor do
  belongs_to :facility
  permit_params :number, :facility_id
  
end
