class Facility < ApplicationRecord
  has_many :floors
  has_many :rooms
  has_one :address, as: :addressable
  has_many :emails, as: :emailable
  has_many :phones, as: :phoneable

  has_many_attached :images

  scope :public_records, -> { where(private: false) }
end
