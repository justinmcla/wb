class Department < ApplicationRecord
  belongs_to :departmentable, polymorphic: true

  validates :name, presence: true
  
end
