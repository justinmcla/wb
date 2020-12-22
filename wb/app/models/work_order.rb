class WorkOrder < ApplicationRecord
  belongs_to :facility
  belongs_to :room
end
