class Api::V1::ApiController < ActionController::API

  private

  def authenticate_token
    payload = JsonWebToken.decode(auth_token)
    @code   = payload['code']
  rescue JWT::ExpiredSignature
    render json: { errors: 'Credentials expired', status: :unauthorized } and return
  rescue JWT::DecodeError
    render json: { errors: 'Invalid credentials', status: :unauthorized } and return
  end

  def auth_token
    @auth_token ||= request.headers.fetch("Authorization", "").split(" ").last
  end
end
