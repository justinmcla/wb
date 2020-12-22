class Phone < ApplicationRecord
  belongs_to :phoneable, polymorphic: true
end
