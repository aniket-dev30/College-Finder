# 🎓 College Finder (College Discovery & Decision Platform)

A full-stack college discovery platform that helps users explore, compare, and shortlist colleges with a clean, decision-focused experience.

Built as a scalable MVP focusing on product clarity, performance, and system design.

---

## 🚀 Live Demo

- 🌐 Frontend: https://college-finder-beta-five.vercel.app/
- ⚙️ Backend: https://college-finder-b6wp.onrender.com

---

## 🎯 Core Features

### 🔍 Discovery
- Search colleges by name
- Filter by location
- Paginated results for scalable browsing
- Fast and responsive UI

---

### ⚖️ Decision Support
- Compare two colleges side-by-side
- Highlights better options:
  - ⭐ Higher rating
  - 💰 Lower fees
- Clean, structured layout for quick decisions

---

### ⭐ Shortlisting
- Save/bookmark colleges
- Remove saved colleges
- Persistent storage using localStorage
- Dedicated Saved Colleges page

---

### 📄 College Details
- Detailed view for each college
- Includes:
  - Location
  - Fees
  - Rating
  - Courses
  - Facilities

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- React (Vite)
- Tailwind CSS
- React Router

### ⚙️ Backend
- Node.js
- Express.js

### 🗄️ Database
- PostgreSQL (planned / partial)
- Currently using structured static dataset for MVP

---

## ⚙️ System Architecture

### Frontend
- Component-based architecture
- Reusable UI components (Card, Compare, Layout)
- State managed using React hooks

### Backend
- REST API design
- Layered architecture:
  - Routes
  - Controllers
  - Data layer

---

## 📦 API Endpoints

### Get Colleges (with filters & pagination)
GET /api/colleges?search=&location=&page=&limit=

### Get College by ID
GET /api/colleges/:id

---

## 🧠 Engineering Decisions

- Implemented debounced search to reduce unnecessary API calls
- Used pagination for scalability (handles large datasets)
- Designed clean API structure for future DB integration
- Used localStorage for quick MVP implementation of bookmarking
- Focused on decision-first UI rather than feature overload

---

## ⚖️ Trade-offs

- Used static dataset instead of full database for faster development
- Limited filters (only location) due to time constraints
- No authentication system implemented
- Focused more on core functionality than advanced features

---

## 📈 Scalability Considerations

- Pagination prevents loading large datasets at once
- Backend filtering improves performance
- Modular code structure supports future expansion
- API design compatible with PostgreSQL integration

---

## 🧪 Future Improvements

- Add more filters (fees, rating, courses)
- Fully integrate PostgreSQL database
- Add authentication and user accounts
- Build recommendation system
- Improve mobile responsiveness

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/aniket-dev30/College-Finder.git
cd college-finder
```
---

### 2. Install Dependencies

#### Frontend
```bash
cd frontend  
npm install  
npm run dev  
```
#### Backend
```bash
cd backend  
npm install  
node server.js  

```
---

## 📁 Project Structure

college-finder/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│
└── README.md

---

## 🎯 What Makes This Project Strong

- Clean and minimal UI
- Decision-focused features (compare + highlight)
- Scalable backend design
- Proper error handling and fallback UI
- Real-world product thinking

---

## 👨‍💻 Author

Aniket Jha  
GitHub: https://github.com/aniket-dev30  
LinkedIn: https://www.linkedin.com/in/aniket-jha-732a77258  

---

## ⭐ Final Note

This project focuses on building a clean, scalable, and decision-driven platform rather than just replicating UI, aligning with real-world product engineering practices.
