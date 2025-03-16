Coupon Distribution App

This project is a full-stack coupon distribution application built with React (Vite) for the frontend and Node.js + Express for the backend. The app distributes coupons to guest users in a round-robin manner while providing an admin panel to manage coupons and prevent abuse.

🏗️ Project Structure

root/
├── backend/       # Backend (Node.js + Express)
├── frontend/      # Frontend (React + Vite)
└── README.md

🚀 Tech Stack

Frontend: React (Vite), Tailwind CSS

Backend: Node.js, Express, MongoDB

Deployment: Render (Backend), Vercel (Frontend)

⚙️ Setup Instructions

1. Clone the Repository

git clone https://github.com/anuj-pal27/coupon-app.git
cd coupon-app

2. Backend Setup

cd backend
npm install

Create a .env file in the backend/ directory and add:

PORT=8080
MONGO_URI=your-mongodb-connection-string
FRONTEND_URL=https://coupon-app-sigma.vercel.app

Start the backend:

npm start

Backend should be running at: http://localhost:8080 

3. Frontend Setup

cd ../frontend
npm install

Create a .env file in the frontend/ directory and add:

VITE_BACKEND_URL=https://coupon-app-t1vg.onrender.com

Start the frontend:

npm run dev

Frontend should be running at: http://localhost:5173

🌐 Deployment

Backend Deployment (Render)

Go to Render.com, create a new web service, and connect your GitHub repo.

In the Build Command:

cd backend && npm install

In the Start Command:

cd backend && node server.js

Add environment variables in Render:

PORT=8080
MONGO_URI=your-mongodb-connection-string
FRONTEND_URL=https://coupon-app-sigma.vercel.app/

Deploy and note the backend URL (e.g., https://coupon-app-t1vg.onrender.com).

Frontend Deployment (Vercel)

Go to Vercel.com and create a new project connected to your GitHub repo.

Add the environment variable:

VITE_BACKEND_URL=https://coupon-app-dodd.onrender.com

Deploy, and your frontend URL should look like: https://coupon-app-rho.vercel.app

📌 Features

User can claim coupons in a round-robin manner.

Admin panel for managing coupons.

Prevents coupon abuse using IP/session tracking.

Full-stack app deployed with frontend on Vercel and backend on Render.
