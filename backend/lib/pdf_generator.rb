require 'prawn'
require 'prawn/table'

class PdfGenerator
  def self.generate_pdf(project_id)
    project = Project.find(project_id)
    Prawn::Document.generate("project_#{project_id}.pdf", page_size: 'A4', margin: [20, 50]) do |pdf|
      pdf.text "Project Details - #{project.project_name}", align: :center, size: 16, style: :bold
      pdf.move_down 20

      # Fetch data from the database for the specific project
      technical_escalations = project.technical_escalations
      financial_escalations = project.financial_escalations
      operational_escalations = project.operational_escalations
      # clients = [project.client] # Assuming each project has one client
      audit_histories = project.audit_histories
      version_histories = project.version_histories
      overviews = project.overviews
      stakeholders = project.stakeholders
      risk_profilings = project.risk_profilings
      phases = project.phases
      sprint_details = project.sprint_details
      approved_teams = project.approved_teams
      resources = project.resources
      client_feedbacks = project.client_feedbacks
      project_updates = project.project_updates
      moms_of_client_meetings = project.moms_of_client_meetings

      # Define table data and styles for each data type
      # Table data generation methods remain unchanged
      # Define table options and styles for all data types
      table_options = {
        header: true,
        cell_style: { padding: 5, border_width: 1, size: 10 },
        row_colors: ['FFFFFF', 'DDDDDD']
      }

      # Draw tables for each data type
      draw_table(pdf, generate_table_data(technical_escalations), 'Technical Escalations', table_options)
      draw_table(pdf, generate_table_data(financial_escalations), 'Financial Escalations', table_options)
      draw_table(pdf, generate_table_data(operational_escalations), 'Operational Escalations', table_options)
      draw_table(pdf, generate_project_table_data([project]), 'Projects', table_options) # Pass project as an array
      # draw_table(pdf, generate_client_table_data(clients), 'Clients', table_options)
      draw_table(pdf, generate_audit_table_data(audit_histories), 'Audit Histories', table_options)
      draw_table(pdf, generate_version_table_data(version_histories), 'Version Histories', table_options)
      draw_table(pdf, generate_overview_table_data(overviews), 'Overviews', table_options)
      draw_table(pdf, generate_stakeholder_table_data(stakeholders), 'Stakeholders', table_options)
      draw_table(pdf, generate_risk_profiling_table_data(risk_profilings), 'Risk Profilings', table_options)
      draw_table(pdf, generate_phase_table_data(phases), 'Phases', table_options)
      draw_table(pdf, generate_sprint_detail_table_data(sprint_details), 'Sprint Details', table_options)
      draw_table(pdf, generate_approved_teams_table_data(approved_teams), 'Approved Teams', table_options)
      draw_table(pdf, generate_resources_table_data(resources), 'Resources', table_options)
      draw_table(pdf, generate_client_feedbacks_table_data(client_feedbacks), 'Client Feedbacks', table_options)
      draw_table(pdf, generate_project_updates_table_data(project_updates), 'Project Updates', table_options)
      draw_table(pdf, generate_moms_of_client_meetings_table_data(moms_of_client_meetings), 'Moms of Client Meetings', table_options)
    end
  end

  private

  def self.generate_table_data(escalations)
    table_data = [['Escalation Level', 'Name']]
    escalations.each { |escalation| table_data << [escalation.escalation_level, escalation.name] }
    table_data
  end

  def self.generate_project_table_data(projects)
    table_data = [['Project Name', 'Project Description', 'Project Manager']]
    projects.each { |project| table_data << [project.project_name, project.project_desc, project.project_manager] }
    table_data
  end

  # def self.generate_client_table_data(clients)
  #   table_data = [['Client Name', 'Client Email']]
  #   clients.each { |client| table_data << [client.name, client.email] }
  #   table_data
  # end

  def self.generate_audit_table_data(audit_histories)
    table_data = [['Date', 'Reviewed By', 'Status', 'Reviewed Section', 'Queries', 'Action Item']]
    audit_histories.each { |audit| table_data << [audit.date, audit.reviewed_by, audit.status, audit.reviewed_section, audit.queries, audit.action_item] }
    table_data
  end

  def self.generate_version_table_data(version_histories)
    table_data = [['Version No', 'Version Type', 'Change', 'Reason', 'Created By', 'Revision Date', 'Approve Date', 'Approved By']]
    version_histories.each { |version| table_data << [version.version_no, version.version_type, version.change, version.reason, version.created_by, version.revision_date, version.approve_date, version.approved_by] }
    table_data
  end

  def self.generate_overview_table_data(overviews)
    table_data = [['Project Overview', 'Purpose', 'Goals', 'Objectives', 'Budget']]
    overviews.each { |overview| table_data << [overview.project_overview, overview.purpose, overview.goals, overview.objectives, overview.budget] }
    table_data
  end

  def self.generate_stakeholder_table_data(stakeholders)
    table_data = [['Title', 'Name', 'Contact']]
    stakeholders.each { |stakeholder| table_data << [stakeholder.title, stakeholder.name, stakeholder.contact] }
    table_data
  end

  def self.generate_risk_profiling_table_data(risk_profilings)
    table_data = [['Risk Type', 'Description', 'Severity', 'Impact', 'Remedial Steps', 'Status', 'Closure Date']]
    risk_profilings.each { |risk_profiling| table_data << [risk_profiling.risk_type, risk_profiling.description, risk_profiling.severity, risk_profiling.impact, risk_profiling.remedial_steps, risk_profiling.status, risk_profiling.closure_date] }
    table_data
  end

  def self.generate_sprint_detail_table_data(sprint_details)
    table_data = [['Sprint', 'Start Date', 'End Date', 'Status', 'Comments']]
    sprint_details.each { |sprint_detail| table_data << [sprint_detail.sprint, sprint_detail.start_date, sprint_detail.end_date, sprint_detail.status, sprint_detail.comments] }
    table_data
  end

  def self.generate_phase_table_data(phases)
    table_data = [['Title', 'Start Date', 'Completion Date', 'Approval Date', 'Status', 'Revised Completion Date', 'Comments']]
    phases.each { |phase| table_data << [phase.title, phase.start_date, phase.completion_date, phase.approval_date, phase.status, phase.revised_completion_date, phase.comments] }
    table_data
  end

  def self.generate_approved_teams_table_data(approved_teams)
    table_data = [['Number of Resources', 'Role', 'Availability Percentage', 'Duration']]
    approved_teams.each { |team| table_data << [team.number_of_resources, team.role, team.availability_percentage, team.duration] }
    table_data
  end

  def self.generate_resources_table_data(resources)
    table_data = [['Resource Name', 'Role', 'Start Date', 'End Date', 'Comment']]
    resources.each { |resource| table_data << [resource.resource_name, resource.role, resource.start_date, resource.end_date, resource.comment] }
    table_data
  end

  def self.generate_client_feedbacks_table_data(client_feedbacks)
    table_data = [['Feedback Type', 'Date Received', 'Detailed Feedback', 'Action Taken', 'Closure Date']]
    client_feedbacks.each { |feedback| table_data << [feedback.feedback_type, feedback.date_received, feedback.detailed_feedback, feedback.action_taken, feedback.closure_date] }
    table_data
  end

  def self.generate_project_updates_table_data(project_updates)
    table_data = [['Date', 'General Updates']]
    project_updates.each { |update| table_data << [update.date, update.general_updates] }
    table_data
  end

  def self.generate_moms_of_client_meetings_table_data(moms_of_client_meetings)
    table_data = [['Date', 'Duration', 'MoM Link', 'Comments']]
    moms_of_client_meetings.each { |mom| table_data << [mom.date, mom.duration, mom.mom_link, mom.comments] }
    table_data
  end


  def self.draw_table(pdf, table_data, title, table_options)
    pdf.text title, align: :center, size: 14, style: :bold
    pdf.table(table_data, table_options) do
      cells.padding = 8
      cells.border_width = 0.5
      row(0).font_style = :bold
      self.cells.border_color = "888888"
    end
    pdf.move_down 20
  end
end
