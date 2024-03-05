class Project < ApplicationRecord
    has_many :audit_histories
    has_many :version_histories
end
