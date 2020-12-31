class Api::V1::ApiController < ActionController::API

  private

  def authenticate_token
    payload = JsonWebToken.decode(auth_token)
    @code   = payload['code']
  rescue JWT::ExpiredSignature
    render json: { errors: 'Expired token', status: :unauthorized }
  rescue JWT::DecodeError
    render json: { errors: 'Invalid token', status: :unauthorized }
  end

  def auth_token
    @auth_token ||= request.headers.fetch("Authorization", "").split(" ").last
  end
end
