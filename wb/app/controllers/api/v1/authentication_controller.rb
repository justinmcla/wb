class Api::V1::AuthenticationController < Api::V1::ApiController
  def create
    record = handle_params
    render_no_record and return unless record
    render_invalid   and return unless record.authenticate(strong_params[:password])

    render_token(strong_params[:code])
  end

  private

  def handle_params
    case strong_params[:request_type]
    when 'room'      then Room.find_by aid: params[:code]
    when 'workOrder' then WorkOrder.find_by confirmation: params[:code]
    end
  end

  def strong_params
    params.permit(:request_type, :code, :confirmation, :password)
  end
end
