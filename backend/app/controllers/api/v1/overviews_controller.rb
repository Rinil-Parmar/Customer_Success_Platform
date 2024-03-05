class Api::V1::OverviewsController < ApplicationController
  before_action :set_overview, only: %i[ show update destroy ]

  # GET /overviews
  def index
    @overviews = Overview.all

    render json: @overviews
  end

  # GET /overviews/1
  def show
    render json: @overview
  end

  # POST /overviews
  def create
    @overview = Overview.new(overview_params)

    if @overview.save
      render json: @overview, status: :created, location: api_v1_project_url(@overview)
    else
      render json: @overview.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /overviews/1
  def update
    if @overview.update(overview_params)
      render json: @overview
    else
      render json: @overview.errors, status: :unprocessable_entity
    end
  end

  # DELETE /overviews/1
  def destroy
    @overview.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_overview
      @overview = Overview.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def overview_params
      params.require(:overview).permit(:project_id, :project_overview, :purpose, :goals, :objectives, :budget)
    end
end
