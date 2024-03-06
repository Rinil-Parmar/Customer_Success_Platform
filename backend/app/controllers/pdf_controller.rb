# app/controllers/pdf_controller.rb
class PdfController < ApplicationController
  def generate_pdf
    PdfGenerator.generate_pdf
    send_file 'technical_escalations.pdf', filename: 'technical_escalations.pdf', type: 'application/pdf', disposition: 'attachment'
  end
end
