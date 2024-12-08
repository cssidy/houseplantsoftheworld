# Houseplants Of The World

Ever wonder where your houseplants come from?
Explore the globe below to discover the countries where your favorite houseplant species
truly feel at home.

This app is built with Mapbox API, React, TailwindCSS, Express, Node, and MongoDB.

## Basics

DB (MongoDB) --> API Server (Express.js) -- Client (React)

First step, you will need to set up a database with MongoDB and populate it with data to run the API server app. This monorepo is functional and sufficient for local testing environments. For production, it made more sense to break apart the monorepo and host the front-end app and API server app separately. When you host the API server app, you will need to make some minor adjustments to the server app, such as removing any url routing responsibilities from Express.js and installing npm packages like express-slow-down and express-rate-limit.

## Local Dev

To get running, you will need to add a .env file to the client directory and a config.env file to the server directory.

The client app needs these environment variables:

```
VITE_MAPBOX_ACCESS_TOKEN=<your-mapbox-access-token>
VITE_DEV_DB_URL=http://localhost:5000
VITE_PROD_DB_URL=<your-server-host>
```

The server app needs these environment variables:

```
ATLAS_URI=<your-mongo-access-token>
PORT=5000
```

**Run the client and server apps from the same time, in different terminal tabs.**

Run the React app:

```
cd client
npm install
npm run dev
```

Run the server app:

```
cd server
npm install
npm run start
```

### API

Get all houseplants in db:

```
http://localhost:5000/api/
```

Get a single houseplant by ID:

```
http://localhost:5000/api/66ff553a9e1be31d931f531d
```
