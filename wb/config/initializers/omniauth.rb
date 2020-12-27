Rails.application.config.middleware.use OmniAuth::Builder do
  provider :microsoft_office365, ENV['OFFICE365_KEY'], ENV['OFFICE365_SECRET']
  provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET']
end
