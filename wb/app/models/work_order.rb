class WorkOrder < ApplicationRecord
  to_param :confirmation
  belongs_to :facility
  belongs_to :room
end
