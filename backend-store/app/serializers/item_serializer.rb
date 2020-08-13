class ItemSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :price, :description
    belongs_to :category

end