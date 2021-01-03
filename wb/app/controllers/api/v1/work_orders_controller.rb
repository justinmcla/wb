class Api::V1::WorkOrdersController < Api::V1::ApiController
  before_action :authenticate_token, only: %i[show update]

  def show
    work_order ? render_work_order(work_order) : render_no_record
  end

  def create
    authenticate_token if facility.private
    new_work_order = WorkOrder.new(strong_params)
    new_work_order.save ? render_with_token(new_work_order) : render_errors(new_work_order)
  end

  def update
    work_order.assign_attributes(patch_params) if work_order
    work_order.save ? render_with_token(work_order) : render_errors(work_order)
  end

  private

  def work_order
    @work_order ||= WorkOrder.find_by confirmation: @code
  end

  def facility
    @facility ||= Facility.find_by_id strong_params['facility_id']
  end

  def render_work_order(work_order)
    options = { include: %i[facility facility.address room room.floor] }
    render json: WorkOrderSerializer.new(work_order, options)
  end

  def render_with_token(work_order)
    token = JsonWebToken.encode({ code: work_order.confirmation })
    render json: {
      data: WorkOrderSerializer.new(work_order, include: %i[facility room]),
      token: token,
      status: 200
    }
  end

  def strong_params
    params.permit('facility_id', 'room_id', 'discipline', 'description')
  end

  def patch_params
    params.permit('password')
  end
end
