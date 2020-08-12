class CategoriesController < ApplicationController

    def index
        categories = Category.all
        # render json: categories.to_json(include: {items: {only: [:name, :description, :price]}}, only: :name)
        options = {
            include: [:items]
        }
        render json: CategorySerializer.new(categories, options)
    end

    def show
        category = Category.find(params[:id])
        render json: category
    end
end
