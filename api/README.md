# Leito Shoes stores Inventory API

[SWAGGER Documentation](http://127.0.0.1:3005/api-docs)

## Features

This API contains the following features:

- Conect to the "Third partie websocket service" facilitated by the test
- Expose a websocket channel to publish messages
  - Max 10 inventories
  - Min 10 inventories
  - Warning alerts when the inventory is too low
  - Danger alerts when the inventory is zero
- Expose rest API with these functionalities
  - Store list with `q` filter
  - Model list with `q` filter
  - Store details with `fromDate` and `toDate` filters
    - Store details
    - Data composition to Candle Chart
    - Inventories detailed
  - Model details with `fromDate` and `toDate` filters
    - Model details
    - Data composition to Candle Chart
    - Inventories detailed

## Technologies

- Ruby
- Rails
- Sqlite
- Swagger
- Websockets

## Usage

- To run the app you can run

```bash
rails db:migrate
rails server -p 3005
```

## Tests

- Run tests, I created some VERY basics tests

```bash
rails test
```
