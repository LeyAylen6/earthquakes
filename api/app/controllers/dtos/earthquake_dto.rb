class EarthquakeDTO
    attr_accessor :id, :type, :attributes, :links
  
    def initialize(id, type, attributes, links)
        @id = id
        @type = type
        @attributes = attributes
        @links = links
    end
end