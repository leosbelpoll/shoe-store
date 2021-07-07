module Api::V1
  class ModelsController < ApplicationController
    def index
      if (params[:q] == nil) then
        render json: Model.all
      else
        render json: Model.where("name LIKE ?", "%#{params[:q]}%")
      end
    end

    def details
      fromDate = DateTime.strptime(params[:from].presence || (DateTime.now).strftime(Rails.application.config.default_dates_format),Rails.application.config.default_dates_format)
      toDate =  DateTime.strptime(params[:to].presence || (DateTime.now + 1).strftime(Rails.application.config.default_dates_format),Rails.application.config.default_dates_format)

      model = Model.find_by(id: params[:id])
      if (model == nil)
        raise ActionController::RoutingError.new('Model with id ' + params[:id] +' not found')
      end

      inventories = InventoryHistory.where(model_id: params[:id], :created_at => fromDate..toDate).order('created_at desc')

      candle_chart = Util.candle_chart(params[:id], fromDate, toDate, 'model_id')

      render json: {
        id: model.id,
        name: model.name,
        inventories: ActiveModel::Serializer::CollectionSerializer.new(inventories, serializer: InventorySerializer).as_json,
        candle_chart: candle_chart
      }
    end
  end
end