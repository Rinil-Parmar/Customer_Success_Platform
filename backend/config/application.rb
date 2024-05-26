require_relative "boot"

require "rails/all"
require_relative '../app/middleware/auth0_token_validator'
require_relative '../app/middleware/jwt_auth_middleware.rb'
require_relative '../app/middleware/auth0_token_verifier.rb'
require_relative '../app/middleware/authenticate_jwt.rb'


# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)


module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # config.middleware.use Auth0TokenValidator
    # Autoload middleware from the specified path
    # config.autoload_paths << "#{Rails.root}/app/middleware"
    # config.middleware.use Auth0TokenValidator
    # config.eager_load_paths << Rails.root.join('app/middleware')
    # config.middleware.use Auth0TokenValidator
    # config.middleware.use Auth0TokenVerifier
    #  config.middleware.use AuthenticateJWT

    # config.middleware.use JwtAuthMiddleware


    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
  end
end
