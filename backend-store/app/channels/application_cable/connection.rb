module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # could set current user here & define it as a variable that is set upon connection
    # must use cookies.encrypted to mean session


    # def connect
    #   self.user = "Jenn"
    # end
  end
end
