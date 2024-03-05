class Project < ApplicationRecord
    has_many :audit_histories
    has_many :version_histories
    has_many :stakeholders
    has_many :risk_profilings
    has_many :sprint_details
    has_many :phases
    has_many :operational_escalations
    has_many :financial_escalations
    has_many :technical_escalations
end
