# Leito Shoes stores Client

## Features

This client app contains:

- Monitor in real-time:

  - Max 10 inventories
  - Min 10 inventories
  - Warning alerts when the inventory is too low
  - Danger alerts when the inventory is zero

- Store list
- Model list
- Serach resources
- Store details
  - Candle Chart
  - Inventories details
- Model details
  - Candle Chart
  - Inventories details

## Technologies

- Typescript
- Websockets
- React
- React router
- Redux (State management)
- APEXCHARTS (Charts)
- AntDesign (CSS Library)

## Usage

- To set the server you can create the file `.env.local` and add the next ENV's

```bash
REACT_APP_API_URL="http://127.0.0.1:3005/api/v1",
REACT_APP_WEBSOCKETS_URL="ws://127.0.0.1:3005/cable",
```

- To start de development mode

```bash
yarn start
```

## Tests

I created some VERY basic tests

- Run tests

```bash
yarn test
```
