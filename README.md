# LinkUp - Real-Time Chat Application

LinkUp is a modern real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io. It features user authentication, profile management, real-time messaging, and a beautiful responsive UI.

## Features
- User authentication (Sign up, Login, Logout)
- Profile update with avatar and bio
- Real-time messaging with Socket.io
- Online/offline user status
- Unread message count
- Image sharing in chat
- Responsive and modern UI

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios, Socket.io-client
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io
- **Cloud:** Cloudinary (for image uploads)

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- MongoDB Atlas or local MongoDB instance

### 1. Clone the repository
```powershell
git clone <your-repo-url>
cd chat-app
```

### 2. Setup the backend
```powershell
cd server
npm install
```
Create a `.env` file in the `server/` folder with the following:
```
MONGODB_URI=<your-mongodb-uri>
PORT=5000
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```
Start the backend server:
```powershell
npm run server
```

### 3. Setup the frontend
```powershell
cd ../client
npm install
```
Create a `.env` file in the `client/` folder with:
```
VITE_BACKEND_URL='http://localhost:5000'
```
Start the frontend dev server:
```powershell
npm run dev
```

### 4. Open the app
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure
```
chat-app/
  client/      # React frontend
  server/      # Node.js/Express backend
```

## Deployment
- You can deploy the frontend and backend separately (e.g., Vercel for frontend, Render/Heroku for backend).
- Make sure to update the environment variables for production.

## License
This project is for learning and portfolio purposes.

---

**Made with ❤️ using React, Node.js, and Socket.io**
