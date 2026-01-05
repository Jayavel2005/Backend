# 📘 Backend Day 03 – Service Layer & CRUD (MongoDB)

## 🎯 Objective
Build a production-style **User module** using:
- Express.js
- MongoDB (Mongoose)
- Service Layer (Business Logic)
- Global Error Handling
- Clean Architecture

---

## 🧠 Key Concepts Learned
- Controller vs Service separation
- Pure business logic in services
- Async/Await with DB operations
- Custom error handling using `ApiError`
- Global error middleware
- Password hashing
- CRUD APIs

---

## 🗂 Project Structure
src/
│
├── app.js
├── server.js
│
├── config/
│ ├── db.js
│ └── env.js
│
├── models/
│ └── user.model.js
│
├── controllers/
│ └── user.controller.js
│
├── services/
│ └── user.service.js
│
├── routes/
│ └── user.routes.js
│
├── middlewares/
│ └── error.middleware.js
│
├── utils/
│ ├── ApiError.js
│ └── passwordHash.js
│
└── .env

yaml
Copy code

---

## 🌐 API Endpoints

Base URL:
/api/users

bash
Copy code

### ➕ Create User
**POST** `/api/users`

Request Body:
```json
{
  "name": "Jayavel",
  "email": "jayavel@gmail.com",
  "password": "secret123"
}
Response: 201 Created

📄 Get All Users
GET /api/users

Response: 200 OK

🔍 Get User By ID
GET /api/users/:id

Response: 200 OK
Error: 404 User not found

✏️ Update User
PUT /api/users/:id

Request Body (any field):

json
Copy code
{
  "name": "Jayavel L G"
}
Response: 200 OK

❌ Delete User
DELETE /api/users/:id

Response: 200 OK

🧱 Architecture Rules
Controllers handle HTTP only (req, res)

Services contain business logic

Controllers never talk to DB directly

Errors are thrown from services

Global middleware handles all errors

🚨 Error Handling
Handled using:

ApiError utility

Global error middleware

Common Errors:

400 – Validation error

404 – Resource not found

409 – Duplicate resource

500 – Server error

🧪 Testing
Tested using Postman / HTTPie:

Create user

Duplicate email

Fetch users

Fetch by ID

Update user

Delete user