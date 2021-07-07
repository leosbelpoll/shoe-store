class InventoriesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room"
  end

  def unsubscribed
    raise NotImplementedError
  end
end
