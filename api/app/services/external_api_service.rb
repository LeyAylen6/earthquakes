require 'httparty'

class ExternalApiService
  def self.get_earthquake
    response = HTTParty.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")

    if response.code == 200
        JSON.parse(response.body)
      else
        raise StandardError, "Error getting data: #{response.code}"
    end

  rescue JSON::ParserError => e
    raise StandardError, "Error parsing API data: #{e.message}"
  end
end

