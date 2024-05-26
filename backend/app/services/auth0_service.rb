# app/services/auth0_service.rb
require 'auth0'

class Auth0Service
  class TokenValidationError < StandardError; end

  class << self
    def validate_token(token)
      decoded_token = decode_token(token)
      validate_token_expiration(decoded_token)
      decoded_token
    end

    def decode_token(token)
      client = Auth0::JWTVerifier.new(
        algorithms: ['RS256'],
        iss: 'https://dev-twrzck2hag6l1yfu.us.auth0.com/',
        verify_iss: true,
        jwks_uri: "https://dev-twrzck2hag6l1yfu.us.auth0.com/.well-known/jwks.json"
      )
      decoded_token = client.decode(token, verify_aud: false)
      decoded_token.first
    rescue JWT::DecodeError, Auth0::InvalidTokenError
      raise TokenValidationError, 'Invalid token'
    end

    def validate_token_expiration(decoded_token)
      expiration = decoded_token['exp'] || 0
      if expiration < Time.now.to_i
        raise TokenValidationError, 'Token has expired'
      end
    end
  end
end
