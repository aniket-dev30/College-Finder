const express = require("express");
const router = express.Router();

const {
  getColleges,
  getCollegeById,
  getLocations
} = require("../controllers/collegeController");

router.get("/", getColleges);
router.get("/locations", getLocations);
router.get("/:id", getCollegeById);

module.exports = router;