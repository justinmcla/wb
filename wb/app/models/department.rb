class Department < ApplicationRecord
  belongs_to :departmentable, polymorphic: true
end
