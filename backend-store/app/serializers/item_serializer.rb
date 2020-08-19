class ItemSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :price, :description, :id
end