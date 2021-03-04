# Stirling Sports

![Homepage](https://i.imgur.com/v9ov2bv.png)

This is an ecommerce website built with React with Redux, Typescript, Node.JS, ChakraUI, dockerized Postgres with Prisma as the ORM.

## Setup

This application requires multiple ENV variables. One in the root folder of the project and one in the client folder, for React.

### Root Env
PORT=3001
HOST=localhost

Authentication:
COOKIE_DOMAIN=localhost
COOKIE_PATH=/
SECURE_COOKIE=false

Other environment variables that require are COOKIE_SECRET and JWT_SECRET, NODE_TLS_REJECT_UNAUTHORIZED=0, and STRIPE_SECRET_KEY.
DATABASE_URL should be something like `postgres://prisma:prisma@localhost:5432/prisma`.

### Client Env
On the client side, setup a NODE_ENV variable and REACT_APP_API="http://localhost:3001", as well as a STRIPE_PUBLISHABLE_KEY.

First you should set up the dockerized database and seed it. Run `docker-compose up -d` to get the database running. Then you must set prisma up. `npx prisma migrate dev --preview-feature` and `npx prisma db seed --preview-feature`.

Then you can run `npm run develop` at the root directory to start up both the frontend and backend.
