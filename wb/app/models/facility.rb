class Facility < ApplicationRecord
  has_many :floors
  has_many :rooms
  has_one :address, as: :addressable
  has_many :emails, as: :emailable
  has_many :phones, as: :phoneable
  belongs_to :user

  accepts_nested_attributes_for :address
  accepts_nested_attributes_for :emails
  accepts_nested_attributes_for :phones

  has_many_attached :images

  validates :name,    presence: true
  validates :private, presence: true

  scope :public_records, -> { where(private: false) }
end
