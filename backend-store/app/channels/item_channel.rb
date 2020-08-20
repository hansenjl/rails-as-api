class ItemChannel < ApplicationCable::Channel

    def subscribed
        stream_from "items"
        # @game = Game.find(params[:id])
        # stream_for @game
    end

    def unsubscribed
        #
    end
end