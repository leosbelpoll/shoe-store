module Api::V1
  class StoresController < ApplicationController
    def index
      if (params[:q] == nil) then
        render json: Store.all
      else
        render json: Store.where("name LIKE ?", "%#{params[:q]}%")
      end
    end

    def details
      fromDate = DateTime.strptime(params[:from].presence || DateTime.now.strftime(Rails.application.config.default_dates_format),Rails.application.config.default_dates_format)
      toDate =  DateTime.strptime(params[:to].presence || (DateTime.now + 1).strftime(Rails.application.config.default_dates_format),Rails.application.config.default_dates_format)

      store = Store.find_by(id: params[:id])
      if (store == nil)
        raise ActionController::RoutingError.new('Store with id ' + params[:id] +' not found')
      end

      inventories = InventoryHistory.where(store_id: params[:id], :created_at => fromDate..toDate).order('created_at desc')

      candle_chart = Util.candle_chart(params[:id], fromDate, toDate, "store_id")

      render json: {
        id: store.id,
        name: store.name,
        inventories: ActiveModel::Serializer::CollectionSerializer.new(inventories, serializer: InventorySerializer).as_json,
        candle_chart: candle_chart
      }
    end
  end
end
