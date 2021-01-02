class Api::V1::ApiController < ActionController::API
  private

  def authenticate_token
    payload = JsonWebToken.decode(auth_token)
    @code   = payload['code']
  rescue JWT::ExpiredSignature
    render_expired and return
  rescue JWT::DecodeError
    render_invalid and return
  end

  def auth_token
    @auth_token ||= request.headers.fetch('Authorization', '').split(' ').last
  end

  def render_token(code)
    token = JsonWebToken.encode({ code: code })
    render json: { token: token, status: 200 }
  end

  def render_expired
    render json: { errors: 'Credentials expired', status: 401 }
  end

  def render_invalid
    render json: { errors: 'Invalid credentials', status: 401 }
  end

  def render_no_record
    render json: { errors: 'Record not found', status: 422 }
  end

  def render_errors(resource)
    render json: { errors: resource.errors.full_messages, status: 422 }
  end
end
