# PostWave 🌊 — Full Stack MEAN App

**PostWave** is a social event sharing platform where users can create posts, endorse events ("wave"), and interact with others. Built with the MEAN stack and deployed to live infrastructure.

---

## Live Deployment

- **Frontend**: [S3 Website](https://your-frontend-url.amazonaws.com)
- **Backend (API)**: [Elastic Beanstalk API](https://your-backend-url.elasticbeanstalk.com)
- **Database**: MongoDB Atlas (Remote)

---

## Team Members & Roles

| Name              | Role                                              |
|-------------------|---------------------------------------------------|
| Landis Bargatze   | Debugging, Deployment                             |
| Junshan Tao       | Backend Logic, MongoDB Modeling, Authentification |
| Sabin Dahal       | Deployment, Testing                               |
| Patrick Garner    | UI Design, Testing                                |

---

## Tech Stack

- **Frontend**: Angular 15
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Deployment**:
  - Frontend via AWS S3
  - Backend via AWS Elastic Beanstalk

---

## ⚙️ How to Run Locally

1. **Clone the repo**

bash
git clone https://github.com/sabindahal/MERNStack.git
cd MERNStack

2. **Install Dependencies**

cd server
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer


cd ../client
npm install

3. **Environment Variables**

Create a '.env' file in the /server root
"
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/MEANStack
JWT_SECRET=yourSecretKey
"

4. **Run Application**
# Backend
cd server
npm start

# Frontend
cd client
ng serve

