class Api::V1::WorkOrdersController < Api::V1::ApiController
  before_action :authenticate_token, only: [:show, :update]

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
    if is_private strong_params['facility_id']
      authenticate_token
      return unless @code
    end
    work_order = WorkOrder.new(strong_params)
    work_order.password = work_order.confirmation
    if work_order.save
      render json: { data: WorkOrderSerializer.new(work_order,
        include: [:facility, :room]), status: :ok, token: JsonWebToken.encode({ code: work_order.confirmation }) }
    else
      render json: { errors: work_order.errors.full_messages, status: :unprocessable_entity }
    end
  end

  def update
    work_order = WorkOrder.find_by confirmation: @code
    if work_order
      work_order.update(patch_params)
      render json: { token: JsonWebToken.encode({ code: work_order.confirmation }), message: 'updated', status: :ok }
    else
      render json: { errors: 'Work order not found.', status: :unprocessable_entity }
    end
  end

  private

  def strong_params
    params.permit('facility_id', 'room_id', 'discipline', 'description', 'password', 'confirmation', 'images')
  end

  def patch_params
    params.permit('password')
  end

  def is_private facility
    Facility.find_by_id(facility).private
  end

end
