require 'swagger_helper'

RSpec.describe 'api/v1/stores', type: :request do

  path '/api/v1/stores' do
    parameter name: 'q', in: :query, type: :string, description: 'Search stores by name'

    get('List stores') do
      tags "Stores"
      produces 'application/json'

      response(200, 'successful') do
        schema type: :array,
          items: {
            properties: {
              id: { type: :integer },
              name: { type: :string }
            }
          }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/api/v1/stores/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'id'
    parameter name: 'fromDate', in: :query, type: :date, description: 'From date', example: '01-07-2021'
    parameter name: 'toDate', in: :query, type: :date, description: 'To date', example: '01-08-2021'

    get('Details store') do
      tags "Stores"
      produces 'application/json'


      response(200, 'successful') do
        schema type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            inventories: { type: :array,
              items: {
                properties: {
                  inventory: { type: :integer },
                  id: { type: :integer },
                  created_at: { type: :string, format: 'date-time' },
                  store: { type: :object,
                    properties: {
                      id: { type: :integer },
                      name: { type: :string },
                    }
                   },
                  model: { type: :object,
                    properties: {
                      id: { type: :integer },
                      name: { type: :string },
                    }
                  }
                }
              },
            },
            candle_chart: { type: :array,
              items: {
                properties: {
                  date: { type: :string, format: 'date-time' },
                  low: { type: :integer },
                  high: { type: :integer },
                  open: { type: :integer },
                  close: { type: :integer }
                }
              }
            },
          },
          required: [ 'id', 'name', 'inventories', 'candle_chart' ]

        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end

      response(404, 'Not found') do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
