class CommentsController < ApplicationController
    skip_before_action :verify_authenticity_token

    # POST api/features/:id/comments
    def create 
        @comment = Comments.new(feature_id: params[:id], body: params[:body])
        
        if !@comment["body"].present?
            render json: { 
                error: "The 'body' field is required" 
                }, status: :bad_request
            return
        end

        puts "comment: #{@comment.inspect}"

        if @comment.save
            render json: @comment, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    # GET api/features/:id/comments
    def show
        @comments = Comments.where(feature_id: params[:id]).order(id: :desc)
        render json: @comments, status: :ok

    rescue ActiveRecord::RecordNotFound
        render json: { error: @comments.errors}, status: :not_found
    end
end
