# Developer Manual

## Project Name
Weather Based Outfit Recommender

---

# Overview

This application is a full-stack weather-based outfit recommendation system that uses external weather APIs, a Node.js backend, a React frontend, and a Supabase database to generate personalized clothing recommendations.

---

# Tech Stack

## Frontend
- React
- Tailwind CSS
- Vite

## Backend
- Node.js
- Express.js

## Database
- Supabase

## External APIs
- Weather Forecast API: https://open-meteo.com/en/docs 
- Air Quality API: https://open-meteo.com/en/docs/air-quality-api
- Histrorical Weather API: https://open-meteo.com/en/docs/historical-weather-api

---

# Project Structure



project-root/
│
├── client/                 # Frontend React app
├── server/                 # Backend Express server
├── docs/                   # Documentation
├── README.md
├── package.json
└── .env


# Instillation Guide
Make sure the following are installed:

Node.js
npm
Git

# Clone Repo
git clone https://github.com/jc138701/inst377-finalproject.git 
cd inst377-finalproject


# Install Frontend
cd client
npm install

# Install Backend
cd ../server
npm install

# ENV Variables
PORT=3000
WEATHER_API=One of API from above
SUPABASE_URL=qhqayvaswmflpclycdbg.supabase.co
SUPABASE_KEY=sb_publishable_wrcY6vwqPHQaZ1akef64aw_APvSjVId


# Running App
cd server
npm run dev

# Running Test
npm test

# Base URL
http://localhost:3000/(WeatherAPI)

# EndPoints
GET /weather
Description

Returns current weather information for a selected city.

Example: GET /api/weather?city=Boston

Request: {
  "temperature": 45,
  "condition": "Cloudy"
}

POST /recommendation
Description

Generates personalized outfit recommendation.

Request Body: {
  "temperature": 45,
  "humidity": 70,
  "windSpeed": 12,
  "preferences": {
    "coldTolerance": 2
  }
}

Response: {
  "recommendation": {
    "outerLayer": "Jacket",
    "footwear": "Boots"
  }
}

GET /wardrobe
Description

Returns all wardrobe items for a user.

POST /wardrobe
Description

Adds new wardrobe item to database.

PATCH /wardrobe/:id
Description

Updates wardrobe item information.

DELETE /wardrobe/:id
Description

Deletes wardrobe item.

# Future Development Roadmap
Planned Features
User authentication
AI-generated outfit scoring
Weekly outfit planner
Push notifications
Wardrobe image uploads
Machine learning personalization


# Frontend Deployment
Vercel

# Backend Deployment
Vercel 

# Database
Supabase

# Final Notes

Future developers should review:
.env setup
API rate limits
Supabase authentication configuration
Weather API documentation