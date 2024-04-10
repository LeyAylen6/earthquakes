class FeaturesProcessor
    def self.process(data)
        data["features"].each do |feature| 
            feature_updated = create_feature_structure(feature)
            
            if valid_feature?(feature_updated)
                Features.find_or_create_by(feature_updated)
            end
        end
    end

    def self.create_feature_structure(feature)
        {
            external_id: feature["id"],
            mag: feature["properties"]["mag"],
            place: feature["properties"]["place"],
            time: feature["properties"]["time"],
            url: feature["properties"]["url"],
            tsunami: feature["properties"]["tsunami"] == 1 ? true : false,
            mag_type: feature["properties"]["magType"],
            title: feature["properties"]["title"],
            longitude: feature["geometry"]["coordinates"][0],
            latitude: feature["geometry"]["coordinates"][1]
        }
    end

    def self.valid_feature?(feature)
        !feature[:title].nil? &&
        !feature[:url].nil? &&
        !feature[:place].nil? &&
        !feature[:mag_type].nil? &&
        feature[:mag].between?(-1.0, 10.0) &&
        feature[:latitude].between?(-90.0, 90.0) &&
        feature[:longitude].between?(-180.0, 180.0)
    end
end