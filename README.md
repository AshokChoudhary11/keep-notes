# Keep Notes - Full Stack Notes Taking Application

A modern, secure, and feature-rich notes taking application built with Next.js and Node.js/Express.

![Keep Notes](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Features
- **User Authentication**: Secure JWT-based authentication system
- **CRUD Operations**: Create, read, update, and delete notes
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Instant synchronization of notes
- **Secure**: Password hashing and secure token management
- **SEO Optimized**: Meta tags for better search engine visibility
- **Smooth Animations**: Enhanced UX with Framer Motion
- **Custom UI Components**: Hand-crafted components without pre-made libraries

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom components, no UI libraries)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Animations**: Framer Motion

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Password Hashing**: bcryptjs

### DevOps
- **Containerization**: Docker & Docker Compose
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (v7.0 or higher) OR Docker
- Git

## 🔧 Installation & Setup

### Option 1: Local Development (Without Docker)

#### 1. Clone the repository
```bash
git clone <your-repository-url>
cd login-testing
```

#### 2. Install root dependencies
```bash
npm install
```

#### 3. Setup Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/keepnotes
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

#### 4. Setup Frontend

```bash
cd ../frontend
npm install

# Create .env.local file
cp .env.local.example .env.local
```

Edit `frontend/.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 5. Start MongoDB

Make sure MongoDB is running locally:
```bash
# Using MongoDB service
brew services start mongodb-community@7.0  # macOS
sudo systemctl start mongod  # Linux
```

#### 6. Run the Application

From the root directory:

**Development Mode:**
```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:3000`

**Or run separately:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Option 2: Using Docker (Recommended)

#### 1. Clone the repository
```bash
git clone <your-repository-url>
cd login-testing
```

#### 2. Build and run with Docker Compose
```bash
docker-compose up --build
```

This will:
- Start MongoDB on port 27017
- Start Backend API on port 5000
- Start Frontend on port 3000

To run in detached mode:
```bash
docker-compose up -d
```

To stop the containers:
```bash
docker-compose down
```

## 📁 Project Structure

```
login-testing/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   └── database.ts
│   │   ├── controllers/    # Route controllers
│   │   │   ├── auth.controller.ts
│   │   │   └── notes.controller.ts
│   │   ├── middleware/     # Custom middleware
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── models/         # Database models
│   │   │   ├── User.model.ts
│   │   │   └── Note.model.ts
│   │   ├── routes/         # API routes
│   │   │   ├── auth.routes.ts
│   │   │   └── notes.routes.ts
│   │   └── server.ts       # Entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Frontend Application
│   ├── src/
│   │   ├── api/           # API client functions
│   │   │   ├── auth.ts
│   │   │   └── notes.ts
│   │   ├── components/    # React components
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Layout.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Textarea.tsx
│   │   │       ├── Modal.tsx
│   │   │       └── NoteCard.tsx
│   │   ├── lib/           # Utilities
│   │   │   └── axios.ts
│   │   ├── pages/         # Next.js pages
│   │   │   ├── _app.tsx
│   │   │   ├── _document.tsx
│   │   │   ├── index.tsx
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── notes.tsx
│   │   │   └── account.tsx
│   │   ├── store/         # State management
│   │   │   ├── authStore.ts
│   │   │   └── notesStore.ts
│   │   └── styles/        # Global styles
│   │       └── globals.css
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── docker-compose.yml
├── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Notes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/notes` | Create new note | Yes |
| GET | `/api/notes` | Get all user notes | Yes |
| GET | `/api/notes/:id` | Get single note | Yes |
| PUT | `/api/notes/:id` | Update note | Yes |
| DELETE | `/api/notes/:id` | Delete note | Yes |

## 📱 Usage

### 1. Register a New Account
- Navigate to `http://localhost:3000/register`
- Fill in username, email, and password
- Click "Register"

### 2. Login
- Navigate to `http://localhost:3000/login`
- Enter your email and password
- Click "Login"

### 3. Create Notes
- After logging in, you'll be on the notes page
- Click the floating "+" button
- Enter title and content
- Click "Add"

### 4. Edit Notes
- Click on any note card
- Modify the content
- Click "Save"

### 5. Delete Notes
- Click on a note to open it
- Click "Delete" button
- Confirm deletion

## 🎨 Design Decisions

### Frontend Architecture
- **Next.js** was chosen for its excellent SEO capabilities, server-side rendering, and developer experience
- **Zustand** provides lightweight state management without boilerplate
- **Custom Components** ensure full control over UI/UX without dependency on third-party libraries
- **Framer Motion** adds smooth animations for better user experience

### Backend Architecture
- **Express.js** offers simplicity and flexibility for RESTful API development
- **MongoDB** provides schema flexibility for rapid development
- **JWT Authentication** ensures stateless and scalable authentication
- **TypeScript** enhances code quality and developer experience

### Security Measures
- Passwords are hashed using bcrypt with salt rounds
- JWT tokens for secure authentication
- HTTP-only approach for token storage
- Input validation on both client and server
- CORS configuration for API security

### Database Schema

**User Model:**
```typescript
{
  user_id: UUID,
  user_name: String,
  user_email: String (unique),
  password: String (hashed),
  created_on: Date,
  last_update: Date
}
```

**Note Model:**
```typescript
{
  note_id: UUID,
  note_title: String,
  note_content: String,
  user_id: UUID (reference),
  created_on: Date,
  last_update: Date
}
```

## 🧪 Testing

To test the application:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

### Manual Testing Checklist
- [ ] User registration
- [ ] User login
- [ ] Create note
- [ ] Read notes list
- [ ] Edit note
- [ ] Delete note
- [ ] Logout
- [ ] Protected routes (accessing notes without auth)

## 🚀 Deployment

### Backend Deployment
1. Set environment variables in production
2. Build the TypeScript code: `npm run build`
3. Start the server: `npm start`

### Frontend Deployment
1. Set `NEXT_PUBLIC_API_URL` to production API URL
2. Build the Next.js app: `npm run build`
3. Start the server: `npm start`

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/keepnotes
JWT_SECRET=your_secure_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

<img width="1919" height="827" alt="Screenshot 2025-11-04 195606" src="https://github.com/user-attachments/assets/df067f17-f242-4503-b3bd-a5a37b06914c" />
<img width="1895" height="911" alt="Screenshot 2025-11-04 195524" src="https://github.com/user-attachments/assets/82ea91cd-5ea2-45da-af01-7abb58b6d9fa" />
<img width="1897" height="911" alt="Screenshot 2025-11-04 195544" src="https://github.com/user-attachments/assets/2352a06a-0b44-4722-b555-e94a0d47a801" />
