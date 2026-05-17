import axios from "axios";

const API = axios.create({
baseURL: "https://college-finder-b6wp.onrender.com/api"
});

// ✅ GET all colleges (with search + filter + pagination)
export const getColleges = (search = "", location = "", page = 1) =>
  API.get("/colleges", {
    params: {
      search,
      location,
      page,
      limit: 3 // 🔥 number of items per page
    }
  });

// ✅ GET single college
export const getCollegeById = (id) =>
  API.get(`/colleges/${id}`);
