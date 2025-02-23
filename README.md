# User Management App

## 📌 Overview
This is a **React + Spring Boot** application that displays a **list of users in a table** and allows navigating to a user’s details page.

- **Frontend:** React + Vite, Tailwind CSS
- **Backend:** Java Spring Boot
- **Features:**
  - List users in a table with role based filtering.
  - Click on a user to view detailed information.
  - API calls with **error handling** and **environment-based configuration**.

---

## 🚀 **Getting Started**

### 🔹 **1. Clone the Repository**
```bash
git clone https://github.com/kame-style/PS_User_frontend.git
cd folder_name
```

### 🔹 **2. Setup the Backend (Spring Boot)**  
#### **Pre-requisites**  
- Java 17+
- Maven
Backend github link : https://github.com/kame-style/PS_H2DB_APIs_CRUD.git

### 🔹 **3. Setup the Frontend (React + Vite)**  
#### **Pre-requisites**
- Node.js 18+
- npm

#### **Install Dependencies**
```bash
npm install
```

#### **Configure Environment Variables**  
Create an `.env` file in the **React** project:
```ini
VITE_API_BASE_URL=http://localhost:8080/api/users
```

#### **Run React App**
```bash
npm run dev
```
The app will run at `http://localhost:5173`

---

## 🛠 **Project Structure**
```
/frontend
  ├── src
  │   ├── components
  │   │   ├── UserList.jsx
  │   ├── pages
  │   │   ├── UserDetailPage.jsx
  │   │   ├── UserListPage.jsx
  │   ├── services
  |   │   ├── api.js
  │   ├── App.js
  ├── .env
  ├── vite.config.js
```

---

## ⚡ **API Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/{id}` | Get user by ID |
| `GET` | `/api/users/role/{role}` | Filter users by role |

---

## 🔹 **Exception Handling**
- **Frontend**: Uses `try-catch` with `toast` notifications.
- **Backend**: Uses `@ControllerAdvice` for global exception handling.

---

## ✅ **Unit Testing & Code Coverage**
- **Frontend**: Jest + React Testing Library
- Run frontend tests:
  ```bash
  npm test
  ```
---



