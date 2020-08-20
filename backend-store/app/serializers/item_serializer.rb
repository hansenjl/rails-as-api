class ItemSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :price, :description, :id, :category_id
    # belongs_to :category
end