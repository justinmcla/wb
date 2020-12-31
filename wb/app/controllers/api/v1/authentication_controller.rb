class Api::V1::AuthenticationController < Api::V1::ApiController
  def create
    if record.nil?
      render json: { errors: 'Record not found', status: :unprocessable_entity }
    elsif record && record.authenticate(strong_params[:password])
      render json: { token: JsonWebToken.encode({ code: strong_params[:code] }), status: :ok }
    else
      render json: { errors: 'Invalid credentials', status: :unauthorized }
    end
  end

  private

  def record
    case strong_params[:request_type]
    when 'room' then Room.find_by aid: params[:code]
    when 'workOrder' then WorkOrder.find_by confirmation: params[:code]
    end
  end

  def strong_params
    params.permit(:request_type, :code, :confirmation, :password)
  end

end
