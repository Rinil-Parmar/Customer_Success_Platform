# app/middleware/authenticate_jwt.rb

require 'jwt'

class AuthenticateJWT
  AUTH0_DOMAIN = 'https://dev-twrzck2hag6l1yfu.us.auth0.com/'.freeze
  JWT_ALGORITHMS = ['RS256'].freeze
  YOUR_API_AUDIENCE = 'https://localhost:4000/'.freeze # Replace with your API audience

  def initialize(app)
    @app = app
  end

  def call(env)
    token = extract_token(env)

    puts "AUTHORIZATION HEADER: #{authorization_header}"
    if token
      if validate_token(token) && authenticate_user(token)
        env['jwt.payload'] = decode_token(token)
        return @app.call(env)
      else
        unauthorized_response
      end
    else
      unauthorized_response
    end
  end

  private

  def extract_token(env)
    authorization_header = env['HTTP_AUTHORIZATION']
    authorization_header&.split(' ')&.last
  end
  def validate_token(token)
    begin
      decoded_token = JWT.decode(token, nil,
        true, # Verify the signature of this token
        algorithms: JWT_ALGORITHMS,
        iss: AUTH0_DOMAIN,
        verify_iss: true,
        aud: YOUR_API_AUDIENCE,
        verify_aud: true
      )
      return true
    rescue JWT::DecodeError
      return false
    end
  end

  def authenticate_user(token)
    user_token = User.find_by(jwt_token: token)
    return !user_token.nil?
  end

  def decode_token(token)
    JWT.decode(token, nil, false)[0]
  end

  def unauthorized_response
    [401, { 'Content-Type' => 'application/json' }, [{ error: 'Unauthorized' }.to_json]]
  end
end
