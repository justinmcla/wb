class AlternateContact < ApplicationRecord
  belongs_to :work_order
  has_one :department, as: :departmentable
  has_one :phone, as: :phoneable
  has_one :email, as: :emailable
end
