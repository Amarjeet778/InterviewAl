# InterviewAl — AI-Powered Interview Preparation Platform

InterviewAl is a full-stack MERN web application that helps users prepare for job interviews through AI-powered resume analysis, personalized interview questions, mock interview sessions, and performance reports. The platform also includes user authentication, interview history, and subscription payment integration.

🌐 Live Demo
( https://interviewal-client.onrender.com  )

## 📁 Project Structure

InterviewAl/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AuthModel.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Step1Setup.jsx
│   │   │   ├── Step2Interview.jsx
│   │   │   ├── Step3Report.jsx
│   │   │   └── Timer.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── InterviewHistory.jsx
│   │   │   ├── InterviewPage.jsx
│   │   │   ├── InterviewReport.jsx
│   │   │   └── Pricing.jsx
│   │   │
│   │   ├── redux/
│   │   ├── utils/
│   │   │   └── firebase.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── server/
│   ├── config/
│   │   ├── connectdb.js
│   │   └── token.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── interview.controller.js
│   │   ├── payment.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   ├── isAuth.js
│   │   └── multer.js
│   │
│   ├── models/
│   │   ├── interview.model.js
│   │   ├── payment.model.js
│   │   └── user.model.js
│   │
│   ├── public/
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── interview.route.js
│   │   ├── payment.route.js
│   │   └── user.routes.js
│   │
│   ├── services/
│   │   ├── openRouter.services.js
│   │   └── razorpay.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
└── README.md

### 📂 Folder Description

- **client/** — React frontend, pages, reusable UI components, styling, and Firebase configuration.
- **server/** — Node.js and Express.js backend, API routes, controllers, database models, authentication, and integrations.
- **components/** — Reusable components for interview setup, interview sessions, reports, navigation, and timers.
- **pages/** — Main application pages, including authentication, home, interview history, reports, and pricing.
- **redux/** — Application state management.
- **config/** — Database connection and token configuration.
- **controllers/** — Request handling for authentication, interviews, payments, and users.
- **middlewares/** — Authentication and file-upload middleware.
- **models/** — MongoDB data models for users, interviews, and payments.
- **routes/** — Backend API route definitions.
- **services/** — OpenRouter AI and Razorpay integrations.

## 🚀 Key Features

- **User Authentication:** Google sign-in using Firebase Authentication with JWT-based server authentication.
- **AI Resume Analysis:** Upload a resume for AI-assisted analysis.
- **AI Interview Questions:** Generate interview questions to support personalized interview preparation.
- **Mock Interview:** Practice interviews through an interactive interview interface with a timer.
- **Performance Reports:** Review interview results and question-wise performance visualizations.
- **Interview History:** Access previously completed interview sessions.
- **Subscription Plans:** Explore pricing plans and available credits.
- **Payment Integration:** Razorpay integration for payment processing.
- **Responsive UI:** A React-based interface with reusable components and interactive visualizations.


## 🛠️ Technologies Used

**Frontend**
- React.js and Vite
- React Router
- Redux Toolkit
- CSS
- Framer Motion
- Recharts
- jsPDF

**Backend**
- Node.js
- Express.js
- REST APIs
- MongoDB and Mongoose
- JWT and cookie-based authentication
- Multer for resume uploads

**APIs and Integrations**
- Firebase Authentication
- OpenRouter API for AI functionality
- Razorpay for payments

## 🏗️ Application Architecture

The application follows a client-server architecture.

1. **Frontend:** React handles the user interface, interview workflow, authentication screens, pricing pages, and reports.
2. **Backend:** Node.js and Express.js expose REST APIs for authentication, user management, interview operations, and payments.
3. **Database:** MongoDB stores application data using Mongoose models.
4. **AI Integration:** The backend communicates with the OpenRouter API to support AI-related functionality.
5. **Authentication:** Firebase Google sign-in works with backend JWT-based authentication.
6. **Payments:** Razorpay supports payment processing for subscription plans.

## 📦 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Amarjeet778/InterviewAl.git
cd InterviewAl
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open a second terminal from the project root:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create the required `.env` files and configure your MongoDB connection, JWT secret, OpenRouter API key, Razorpay credentials, and Firebase configuration.

Use the exact environment-variable names referenced in your code. Never commit secret keys or credentials to GitHub.

### 5. Start the backend

From the `server` directory, run the script defined in `server/package.json`. For example:

```bash
npm run dev
```

### 6. Start the frontend

From the `client` directory:

```bash
npm run dev
```

Open the local URL displayed by Vite, typically `http://localhost:5173`.

## 🔒 Security

- Sensitive credentials are stored in environment variables.
- Protected backend routes use authentication middleware.
- File uploads are handled through Multer.
- Payment verification should be performed on the backend before confirming successful transactions.

## 👨‍💻 Developer

**Amarjeet Kumar Singh**

- GitHub: https://github.com/Amarjeet778
- Project Repository: https://github.com/Amarjeet778/InterviewAl

---

⭐ If you find this project useful, consider giving the repository a star on GitHub.
