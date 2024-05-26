class JwtAuthMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    begin
      token = env['HTTP_AUTHORIZATION']&.split(' ')&.last
      decoded_token = Auth0Service.validate_token(token)
      env['jwt.payload'] = decoded_token
    rescue Auth0Service::TokenValidationError
      return [401, { 'Content-Type' => 'application/json' }, [{ error: 'Unauthorized' }.to_json]]
    end

    @app.call(env)
  end
end
