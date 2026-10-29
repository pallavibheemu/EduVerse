# EduVerse — Online Learning Platform

EduVerse is a full-stack e-learning platform built using the MERN stack. It enables learners to explore courses and access learning content, with course management and payment functionality.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Payments:** Razorpay
- **File Storage:** Cloudinary
- **Email:** Nodemailer

## Features

- User registration and authentication
- Course browsing and course details
- Course content management
- Course ratings and reviews
- Online payment integration with Razorpay
- File uploads using Cloudinary
- Email functionality using Nodemailer

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database access
- Credentials for the external services used by the application

### Installation

1. Clone the repository.
2. Install the root dependencies:

   ```bash
   npm install
   ```

3. Install the backend dependencies:

   ```bash
   cd server
   npm install
   ```

4. Configure the required environment variables in your local environment files.
5. Start the frontend and backend using the scripts configured in the project.

## Environment Variables

Configure the required environment variables for the frontend and backend.

Never commit `.env` files, passwords, API secrets, or database connection strings to GitHub.

## Deployment

Planned deployment:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Production URLs will be added after deployment.

