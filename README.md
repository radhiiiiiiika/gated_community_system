# Gated Guest Log System

This is a full-stack visitor management project made for a gated community. It helps a guard or front-desk user register visitors, see who is currently inside, mark a visitor as checked out, and keep a simple record of previous visits.

I kept the database as SQLite because this project is meant to be easy to run locally. There is no separate MySQL server setup needed.

## What the project does

- Add a visitor with name, phone number, house number, and visit purpose
- Show active visitors separately from checked-out visitors
- Save check-in time automatically
- Check out a visitor and save the check-out time
- Delete a visitor record when needed
- Filter visitor records by date
- Show success and error messages in the UI
- Validate visitor data on both the frontend and backend

## Tech used

**Frontend:** React, Vite, JavaScript

**Backend:** Node.js, Express.js

**Database:** SQLite with Sequelize

## Project structure

```text
gated-guestlog/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/Home.jsx  # Main visitor management screen
│   │   ├── api.js          # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env.example
├── server/                 # Express backend
│   ├── src/
│   │   ├── db.js           # SQLite and Visit model setup
│   │   ├── index.js        # Server startup
│   │   └── routes/visits.js
│   └── .env.example
└── README.md
```

## How to run it

### 1. Start the backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The API starts at `http://localhost:5000`. The SQLite database file and `Visits` table are created automatically when the server starts.

### 2. Start the frontend

Open another terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Then open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## API routes

| Method | Route | Use |
| --- | --- | --- |
| GET | `/api/visits` | Get all visitor records |
| POST | `/api/visits` | Add a visitor |
| PUT | `/api/visits/:id` | Mark a visitor as checked out |
| DELETE | `/api/visits/:id` | Delete a visitor record |

For a new visitor, the required fields are `visitor_name` and `purpose`. Phone number is optional, but if entered it must have 7 to 15 digits. The purpose can be `Guest`, `Delivery`, or `Helper`.
