class User < ApplicationRecord
  has_secure_password

  has_many :facilities
  has_many :work_orders, through: :facilities

  validates :name,  presence: true
  validates :email, presence: true, email: true

end
