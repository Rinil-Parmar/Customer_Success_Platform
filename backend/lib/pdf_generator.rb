# lib/pdf_generator.rb
require 'prawn'
require 'prawn/table'

class PdfGenerator
  def self.generate_pdf
    Prawn::Document.generate('technical_escalations.pdf') do |pdf|
      pdf.text 'Technical Escalations', align: :center, size: 16, style: :bold
      pdf.move_down 20

      # Fetch data from the database
      escalations = TechnicalEscalation.all

      # Define table data and styles
      table_data = []
      table_data << ['Escalation Level', 'Name']
      escalations.each { |escalation| table_data << [escalation.escalation_level, escalation.name] }

      # Define table options and styles
      table_options = {
        header: true,
        cell_style: { padding: 5, border_width: 1, size: 10 },
        column_widths: { 0 => 200, 1 => 200 },
        row_colors: ['FFFFFF', 'DDDDDD']
      }

      # Draw the table
      pdf.table(table_data, table_options) do
        cells.padding = 8
        cells.border_width = 0.5
        row(0).font_style = :bold

        # Specify grayscale color for borders
        self.cells.border_color = "888888"
      end
    end
  end
end
