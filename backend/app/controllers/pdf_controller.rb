
class PdfController < ApplicationController
  def generate_pdf
    project_id = params[:project_id] # Assuming project_id is provided in the params
    PdfGenerator.generate_pdf(project_id)
    send_file "project_#{project_id}.pdf", filename: "project_#{project_id}.pdf", type: 'application/pdf', disposition: 'attachment'
  end
end

