const colleges = require("../data/colleges");
const ErrorResponse = require("../utils/errorResponse");

// GET all colleges with filters and pagination
const getColleges = (req, res, next) => {
  const { search, location, sort = "name", page = 1, limit = 10 } = req.query;

  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10));

  let result = [...colleges]; // 🔥 avoid mutating original data

  // 🔍 Search filter
  if (typeof search === "string" && search.trim()) {
    const searchLower = search.toLowerCase().trim();

    result = result.filter(c =>
      c?.name?.toLowerCase().includes(searchLower)
    );
  }

  // 📍 Location filter
  if (typeof location === "string" && location.trim()) {
    const locationLower = location.toLowerCase().trim();

    result = result.filter(c =>
      c?.location?.toLowerCase().includes(locationLower)
    );
  }

  // 🔽 Sorting
  const validSortFields = ["name", "fees", "rating", "location"];
  const sortField = validSortFields.includes(sort) ? sort : "name";

  result.sort((a, b) => {
    const aVal = a?.[sortField];
    const bVal = b?.[sortField];

    // String sorting
    if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal, undefined, { sensitivity: "base" });
    }

    // Number sorting (null-safe)
    return (Number(aVal) || 0) - (Number(bVal) || 0);
  });

  // 📄 Pagination
  const total = result.length;
  const totalPages = Math.ceil(total / limitNum);
  const startIdx = (pageNum - 1) * limitNum;

  const paginatedResult = result.slice(startIdx, startIdx + limitNum);

  res.json({
    success: true,
    data: paginatedResult,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1
    }
  });
};

// GET by ID
const getCollegeById = (req, res, next) => {
  const id = Number(req.params.id);

  if (!id) {
    return next(new ErrorResponse("Invalid college ID", 400));
  }

  const college = colleges.find(c => c.id === id);

  if (!college) {
    return next(new ErrorResponse("College not found", 404));
  }

  res.json({
    success: true,
    data: college
  });
};

// GET unique locations
const getLocations = (req, res, next) => {
  const locations = [...new Set(
    colleges
      .map(c => c?.location)
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));

  res.json({
    success: true,
    data: locations
  });
};

module.exports = { getColleges, getCollegeById, getLocations };