class ItemChannel < ApplicationCable::Channel

    def subscribed
        stream_from "items"
        # @items = Item.all
        # stream_for @items
    end

    def unsubscribed
    end
end