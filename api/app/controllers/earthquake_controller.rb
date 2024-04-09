require "#{Rails.root}/app/services/external_api_service.rb"

class EarthquakeController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :bulk_insert]
  DEFAULT_PER_PAGE = 10
  MAX_PER_PAGE = 1000
  DEFAULT_PAGE = 1

  # POST /bulk 
  def bulk_insert
    @allEarthquakesApi = ExternalApiService.get_earthquake

    @allEarthquakesApi["features"].each do |feature| 
      earthquake = create_earthquake_structure(feature)

      if is_valid_earthquake?(earthquake)
        Earthquake.find_or_create_by(earthquake)
      end
    end

    render json: "Bulk executed sucessfully", status: :ok

  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # GET /earthquake
  def index
    # per_page = params[:per_page].present? ? params[]
    # @allEarthquake = Earthquake.paginate(page: params[:page], per_page: params[:per_page])
    # render json: @allEarthquake, status: :ok
  end

  # GET /earthquake/:id
  def show
    @earthquakeById = Earthquake.find(params[:id])
    render json: @earthquakeById, status: :ok

  rescue ActiveRecord::RecordNotFound
    render json: { error: "Earthquake not found"}, status: :not_found
  end

  # POST /earthquake
  def create
    @earthquake = Earthquake.new(earthquake_params)

    if @earthquake.save
      render json: @earthquake, status: :created
    else 
      if @earthquake.errors[:mag].any? || @earthquake.errors[:latitude].any? || @earthquake.errors[:longitude].any?
        # Error in validation fields
        render json: @earthquake.errors, status: :bad_request
      else
        # Generic Error
        render json: @earthquake.errors, status: :internal_server_error
      end
    end
  end

  private

  def create_earthquake_structure(feature)
    {
      mag: feature["properties"]["mag"],
      place: feature["properties"]["place"],
      time: feature["properties"]["time"],
      url: feature["properties"]["url"],
      tsunami: feature["properties"]["tsunami"],
      magType: feature["properties"]["magType"],
      title: feature["properties"]["title"],
      longitude: feature["geometry"]["coordinates"][0],
      latitude: feature["geometry"]["coordinates"][1]
    }
  end

  def is_valid_earthquake?(earthquake)
    !earthquake[:title].nil? &&
    !earthquake[:url].nil? &&
    !earthquake[:place].nil? &&
    !earthquake[:magType].nil? &&
    earthquake[:mag].between?(-1.0, 10.0) &&
    earthquake[:latitude].between?(-90.0, 90.0) &&
    earthquake[:longitude].between?(-180.0, 180.0)
  end

  private

  # Body
  def earthquake_params
    params.require(:earthquake).permit(:mag, :place, :time, :url, :tsunami, :magType, :title, :longitude, :latitude)
  end
end
