namespace :bulk_insert do
    desc "Insert earthquake features in bulk"
    
    task :features => :environment do
        api_features = ExternalApiService.get_earthquake 
        FeaturesProcessor.process(api_features)
        
        puts "Bulk executed successfully"
        
    rescue StandardError => e
        puts "Bulk failed, error: #{e.message}"
    end
end