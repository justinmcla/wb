class Api::V1::WorkOrdersController < Api::V1::ApiController
  before_action :authenticate_token, only: :show

  def show
    work_order = WorkOrder.find_by confirmation: @code
    if work_order
      render json: WorkOrderSerializer.new(work_order, include: [:facility, :room])
    else
      render json: {errors: 'Work order not found.',
        status: :unprocessable_entity}
    end
  end

  def create
  end

end
