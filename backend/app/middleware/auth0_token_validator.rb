require 'jwt'
require 'net/http'
require 'openssl'
require 'json'

class Auth0TokenValidator
  AUTH0_DOMAIN = 'https://dev-twrzck2hag6l1yfu.us.auth0.com/'.freeze
  JWT_ALGORITHMS = ['RS256'].freeze
  YOUR_API_AUDIENCE = 'https://localhost:4000/'.freeze # Replace with your API audience

  def initialize(app)
    @app = app
  end

  def call(env)
    token = extract_token(env['HTTP_AUTHORIZATION'])
    puts "Token: #{token}"
    if token
      if validate_token(token)
        @app.call(env)
      else
        unauthorized_response
      end
    else
      unauthorized_response
    end
  end

  private

  def extract_token(authorization_header)
    authorization_header&.split(' ')&.last
  end

  def validate_token(token)
    jwks_hash = jwks
    decoded_token = JWT.decode(token, nil,
      true, # Verify the signature of this token
      algorithms: JWT_ALGORITHMS,
      iss: AUTH0_DOMAIN,
      verify_iss: true,
      aud: YOUR_API_AUDIENCE,
      verify_aud: true
    ) do |header|
      jwks_hash[header['kid']]
    end
    true
  rescue JWT::DecodeError => e
    false
  end

  def jwks
    uri = URI("#{AUTH0_DOMAIN}.well-known/jwks.json")
    response = Net::HTTP.get(uri)
    keys = JSON.parse(response)['keys']
    Hash[keys.map do |k|
      [
        k['kid'],
        OpenSSL::X509::Certificate.new(
          Base64.decode64(k['x5c'].first)
        ).public_key
      ]
    end]
  end

  def unauthorized_response
    [401, { 'Content-Type' => 'application/json' }, [{ error: 'Unauthorized' }.to_json]]
  end
end
