class EarthquakeDTO
    attr_accessor :id, :type, :attributes, :links
  
    def initialize(id, type, attributes, links)
      @id = id
      @type = type
      @attributes = attributes
      @links = links
    end
end


  # {
  # "data": [
  #     {
  #       "id": Integer,
  #       "type": "feature",
  #       "attributes": {
  #         "external_id": String,
  #         "magnitude": Decimal,
  #         "place": String,
  #         "time": String,
  #         "tsunami": Boolean,
  #         "mag_type": String,
  #         "title": String,
  #         "coordinates": {
  #           "longitude": Decimal,
  #           "latitude": Decimal
  #         }
  #       },
  #       "links": {
  #         "external_url": String
  #       }
  #     }
  #   ],
  #   "pagination": {
  #     "current_page": Integer,
  #     "total": Integer,
  #     "per_page": Integer
  #   }
  # }