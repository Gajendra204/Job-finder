# Job Portal Application

A full-stack job portal where students can search and apply for jobs, and recruiters/companies can post and manage job listings. Built with **React + Vite** for the frontend and **Node.js + Express + MongoDB** for the backend.

---

## Features

### For Students

- Browse and search for jobs
- View detailed job descriptions
- Apply for jobs
- Track applied jobs in profile

### For Recruiters/Companies

- Register and manage company profiles
- Post new job listings
- View applicants for each job
- Update company and job details

### Admin Panel

- Manage companies and jobs
- View all applicants

---

## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, Cookies
- **File Uploads:** Cloudinary
- **Deployment:** Render.com (backend), Vercel/Netlify (frontend)

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/Gajendra204/Job-finder.git
cd job-portal-main

Setup Backend

cd Server
npm install

Create a .env file in the Server folder:
MONGODB_URI=your_mongodb_connection_string
PORT=8000
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret

```
