# 🌊 PostWave — Full Stack MEAN Social Platform

**PostWave** is a social event sharing platform where users can post events, “wave” (endorse) them, and interact with other users. Built with the MEAN stack and deployed to a live cloud environment.

---

## 🌐 Live Deployment

- **Frontend**: [Live S3 Site] https://d2pbctyagg4jg7.cloudfront.net/login
- **Backend (API)**: [Elastic Beanstalk API]:  mean-backend-env.eba-rc3pastw.us-west-2.elasticbeanstalk.com
- **Database**: MongoDB Atlas

---

## 👥 Team Members & Roles

| Name              | Role                                               |
|-------------------|----------------------------------------------------|
| **Landis Bargatze**   | 🔧 Debugging, Deployment, Frontend Integration     |
| **Junshan Tao**       | 🔐 Backend Logic, MongoDB Modeling, Authentication |
| **Sabin Dahal**       | 🚀 Deployment (EB & S3), Backend Logic, Testing    |
| **Patrick Garner**    | 🎨 UI/UX Design, Project Management , Testing      |

---

## 🛠️ Tech Stack

- **Frontend**: Angular 15
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Auth**: JWT (JSON Web Tokens)
- **Deployment**:
  - Frontend via AWS S3 (Static Site Hosting)
  - Backend via AWS Elastic Beanstalk (Node environment)
  - Environment variables managed via EB Console

---

## ⚙️ Local Development Setup

### 1. Clone the Repo

```bash
git clone https://github.com/sabindahal/MERNStack.git
cd MERNStack
```

### 2. Install Dependencies

**Backend:**

```bash
cd server
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer
```

**Frontend:**

```bash
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `/server` directory:

```
PORT=5050
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/PostWaveDB
JWT_SECRET=yourSuperSecretKey
CORS_ORIGIN=http://localhost:4200
```

> 🔐 Don’t commit this file to GitHub. Use `.env.template` for sharing config.

### 4. Run the Application

```bash
# Start Backend
cd server
npm start

# Start Frontend
cd ../client
ng serve
```

Access the app at [http://localhost:4200](http://localhost:4200)

---

## 🧪 Features

- ✅ User Signup & Login (JWT Auth)
- ✅ Create/Edit/Delete Event Posts (with images)
- ✅ Wave/Unwave (like/endorse) Posts
- ✅ Mobile-friendly UI
- ✅ Protected routes & token-based API access
- ✅ Full deployment to AWS

---

## 📽️ Demo Video

🎥 [Watch the Demo]on canvas

---

## 📁 Folder Structure (Quick Overview)

```
/client        → Angular frontend (SPA)
/server        → Node + Express backend API
/uploads       → Uploaded image assets
```
---
