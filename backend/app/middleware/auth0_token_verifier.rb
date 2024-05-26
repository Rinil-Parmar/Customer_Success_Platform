# lib/auth0_token_verifier.rb
require 'net/http'
require 'uri'

class Auth0TokenVerifier
  def initialize(app)
    @app = app
  end

  def call(env)
    if env['HTTP_AUTHORIZATION'].present?
      token = env['HTTP_AUTHORIZATION'].split(' ').last
      uri = URI("https://dev-twrzck2hag6l1yfu.us.auth0.com/userinfo")
      request = Net::HTTP::Get.new(uri)
      request["Authorization"] = "Bearer #{token}"

      response = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => uri.scheme == 'https') do |http|
        http.request(request)
      end

      if response.code == '200'
        @app.call(env)
      else
        [401, {}, ['Unauthorized']]
      end
    else
      [401, {}, ['Unauthorized']]
    end
  end
end
