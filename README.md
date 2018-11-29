# SendIT
Andela Developer Challenge

[![Build Status](https://travis-ci.org/mcaleb808/SendIT.svg?branch=develop)](https://travis-ci.org/mcaleb808/SendIT)     [![Maintainability](https://api.codeclimate.com/v1/badges/1401d33e6ed13b240c46/maintainability)](https://codeclimate.com/github/mcaleb808/SendIT/maintainability)  [![Coverage Status](https://coveralls.io/repos/github/mcaleb808/SendIT/badge.svg?branch=develop)](https://coveralls.io/github/mcaleb808/SendIT?branch=develop)## Project Overview

SendIT is a courier service that helps users deliver parcels to different destinations. SendIT
provides courier quotes based on weight categories. 

Get Started
Installing dependencies => npm install

Run build => npm run build

run test build => npm run testbuild

Starting development server => npm start

Run the tests => npm run test

| EndPoint | Functionality |
| --- | --- |
| `GET /api/v1/parcels` | Fetch all parcel delivery orders |
| `GET /api/v1/parcels/<parcelId>` | Fetch a specific parcel delivery order |
| `GET /api/v1/users/<userId>/parcels` | Fetch all parcel delivery orders by a specific user |
| `POST /api/v1/parcels` | Create a parcel delivery order |
| `PUT /api/v1/parcels/<parcelId>/cancel` | Cancel the specific parcel delivery order |


