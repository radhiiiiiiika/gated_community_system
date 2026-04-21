# Gated Community Guest Log System
This project is a simple visitor management system built for gated communities. It allows security guards or residents to keep track of who is entering and leaving the premises, along with basic details like purpose of visit and house number.

The system is designed to be straightforward and practical, focusing on day-to-day usability rather than unnecessary complexity.

## Features
* Register new visitors with basic details such as name, phone number, house number, and purpose
* Track check-in and check-out times for each visitor
* Filter visitor logs based on date to view past records
* Separate view for active visitors and those who have already checked out
* Responsive interface that works on both desktop and mobile
* Simple notifications to indicate successful actions or errors

## Tech Stack
### Frontend
* React 18 for building the user interface
* Vite as the development and build tool
* Axios for handling API requests
* Styling done using inline CSS for simplicity
### Backend
* Node.js as the runtime
* Express for handling API routes
* Sequelize for database operations
* SQLite as the database (can be replaced with PostgreSQL if needed)

## Project Structure
The project is split into two main parts: frontend and backend.
### Frontend (gated-guestlog-client):
* src/api.js – handles API calls
* src/App.jsx – main app component
* src/pages/Home.jsx – dashboard view
* index.css – global styling
### Backend (gated-guestlog-server):
* src/index.js – server entry point
* src/db.js – database configuration
* src/routes/visits.js – API routes for visitor operations
* src/seed.js – script to add sample data

## API Endpoints
* GET /api/visits Fetch all visitor records
* POST /api/visits Add a new visitor
* PUT /api/visits/:id Update a visitor record (used for check-out)
* DELETE /api/visits/:id Delete a visitor record

## Installation
### Prerequisites
* Node.js (version 14 or higher)
* npm or yarn

### Backend Setup
* Navigate to the backend folder: cd gated-guestlog-server
* Install dependencies: npm install
* Start the server: npm run dev
* The backend will run on:  http://localhost:5000

### Frontend Setup
* Navigate to the frontend folder: cd gated-guestlog-client
* Install dependencies: npm install
* Start the frontend: npm run dev
* The app will be available at:  http://localhost:5173

### Database Seeding
To populate the database with sample data: cd gated-guestlog-server npm run seed

## Usage
Register a visitor by entering their name (required) along with optional details like phone number and house number. Select the purpose of visit and check them in.
Active visitors will appear in a separate section showing their details and check-in time.

To check out a visitor, simply click the check-out option. Their record will move to the checked-out section.

Visitors can also be deleted if needed.

You can filter records by date using the date picker. There are also quick options to view today's records or clear the filter.

## Database Schema
The system uses a single table to store visit details.
### Visits Table:
* id – unique identifier
* visitor_name – name of the visitor (required)
* visitor_phone – contact number
* house_number – house or unit being visited
* purpose – reason for visit (Guest, Delivery, Helper)
* check_in – timestamp when the visitor entered
* check_out – timestamp when the visitor left (empty if still inside)

## Environment Variables
You can optionally create a .env file in the backend:
PORT=5000

## Future Improvements
Some features that can be added later:
* User authentication with different roles (Admin, Guard, Resident)
* Visitor photo capture
* QR-based check-in and check-out
* Notifications to residents via SMS or email
* Exporting visitor logs
* Support for multiple communities
* Visitor pre-approval system
