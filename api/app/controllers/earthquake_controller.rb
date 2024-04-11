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

    # GET api/features
    def index
        per_page = (params[:per_page] || DEFAULT_PER_PAGE).to_i.clamp(1, MAX_PER_PAGE)
        page = (params[:page] || DEFAULT_PAGE).to_i
        mag_types = params[:mag_type].present? ? params[:mag_type].split(",") : Array.new

        mag_types_valid = Array.new

        mag_types.each do |mag_type|
            if mag_type.in?(MagType::TYPES.values)
                mag_types_valid.push(mag_type)
            end
        end

        features_query = Features.all
        features_query = features_query.where(mag_type: mag_types_valid) if !mag_types_valid.empty?

        @total_count = features_query.count
        @all_features = features_query.paginate(page: page, per_page: per_page)

        features = Array.new

        @all_features.each do |feature| 
        coordinates = CoordinatesDTO.new(feature["longitude"], feature["latitude"])
        
        attributes = AttributesDTO.new(
            feature["external_id"], 
            feature["mag"], 
            feature["place"], 
            feature["time"], 
            feature["tsunami"], 
            feature["mag_type"], 
            feature["title"], 
            coordinates
        )
        
        links = LinksDTO.new(feature["url"])
        feature = EarthquakeDTO.new(feature["id"], "feature", attributes, links)
        features.push(feature)
        end

        pagination = PaginationDTO.new(page, @total_count, per_page)
        response = EarthquakesDTO.new(features, pagination)

        render json: response, status: :ok 
    end
end
