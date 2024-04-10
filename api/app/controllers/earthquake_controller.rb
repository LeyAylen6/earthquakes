require "#{Rails.root}/app/services/external_api_service.rb"
require "#{Rails.root}/app/controllers/dtos/earthquake_dto"
require "#{Rails.root}/app/controllers/dtos/earthquakes_dto"
require "#{Rails.root}/app/controllers/dtos/attributes_dto"
require "#{Rails.root}/app/controllers/dtos/coordinates_dto"
require "#{Rails.root}/app/controllers/dtos/pagination_dto"
require "#{Rails.root}/app/controllers/dtos/links_dto"

class EarthquakeController < ApplicationController
    skip_before_action :verify_authenticity_token
    include MagType

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

    # GET /features
    def index
        per_page = (params[:per_page] || DEFAULT_PER_PAGE).to_i.clamp(1, MAX_PER_PAGE)
        page = (params[:page] || DEFAULT_PAGE).to_i
        mag_type = params[:mag_type].in?(MagType::TYPES.values) ? params[:mag_type] : nil

        puts params[:mag_type]
        puts mag_type

        earthquakes_query = Earthquake.all
        earthquakes_query = earthquakes_query.where(mag_type: mag_type) if mag_type

        @total_count = earthquakes_query.count
        @allEarthquake = earthquakes_query.paginate(page: page, per_page: per_page)

        earthquakes = Array.new

        @allEarthquake.each do |earthquake| 
        coordinates = CoordinatesDTO.new(earthquake["longitude"], earthquake["latitude"])
        
        attributes = AttributesDTO.new(
            earthquake["external_id"], 
            earthquake["mag"], 
            earthquake["place"], 
            earthquake["time"], 
            earthquake["tsunami"], 
            earthquake["mag_type"], 
            earthquake["title"], 
            coordinates
        )
        
        links = LinksDTO.new(earthquake["url"])
        earthquake = EarthquakeDTO.new(earthquake["id"], "feature", attributes, links)
        earthquakes.push(earthquake)
        end

        pagination = PaginationDTO.new(page, @total_count, per_page)
        response = EarthquakesDTO.new(earthquakes, pagination)

        render json: response, status: :ok 
    end

    # # GET /earthquake/:id
    # def show
    #   @earthquakeById = Earthquake.find(params[:id])
    #   render json: @earthquakeById, status: :ok

    # rescue ActiveRecord::RecordNotFound
    #   render json: { error: "Earthquake not found"}, status: :not_found
    # end

    # # POST /earthquake
    # def create
    #   @earthquake = Earthquake.new(earthquake_params)

    #   if @earthquake.save
    #     render json: @earthquake, status: :created
    #   else 
    #     if @earthquake.errors[:mag].any? || @earthquake.errors[:latitude].any? || @earthquake.errors[:longitude].any?
    #       # Error in validation fields
    #       render json: @earthquake.errors, status: :bad_request
    #     else
    #       # Generic Error
    #       render json: @earthquake.errors, status: :internal_server_error
    #     end
    #   end
    # end

    private

    def create_earthquake_structure(feature)
        {
        external_id: feature["id"],
        mag: feature["properties"]["mag"],
        place: feature["properties"]["place"],
        time: feature["properties"]["time"],
        url: feature["properties"]["url"],
        tsunami: feature["properties"]["tsunami"],
        mag_type: feature["properties"]["magType"],
        title: feature["properties"]["title"],
        longitude: feature["geometry"]["coordinates"][0],
        latitude: feature["geometry"]["coordinates"][1]
        }
    end

    def is_valid_earthquake?(earthquake)
        !earthquake[:title].nil? &&
        !earthquake[:url].nil? &&
        !earthquake[:place].nil? &&
        !earthquake[:mag_type].nil? &&
        earthquake[:mag].between?(-1.0, 10.0) &&
        earthquake[:latitude].between?(-90.0, 90.0) &&
        earthquake[:longitude].between?(-180.0, 180.0)
    end

    private

  # Body
    #   def earthquake_params
    #     params.require(:earthquake).permit(:mag, :place, :time, :url, :tsunami, :mag_type, :title, :longitude, :latitude)
    #   end
end
