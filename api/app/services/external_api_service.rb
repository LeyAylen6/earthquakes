require 'httparty'

class ExternalApiService
  BASE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

  def self.get_earthquake
    response = HTTParty.get(BASE_URL)

    handle_response(response)
  end


  def self.handle_response(response)
    case response.code
    when 200..299
      JSON.parse(response.body)
    else
      raise StandardError, "Error getting data: #{response.code}"
    end

  rescue JSON::ParserError => e
    raise StandardError, "Error parsing API data: #{e.message}"
  end

end

