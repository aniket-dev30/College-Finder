import { useEffect, useState } from "react";
import { getColleges } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import CollegeCard from "../components/CollegeCard";

function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 PAGINATION STATES
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const navigate = useNavigate();

  // 🔥 DEBOUNCE + FILTER + PAGINATION
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);

      getColleges(search, location, page)
        .then(res => {
          setColleges(res.data.data);
          setPagination(res.data.pagination);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));

    }, 300);

    return () => clearTimeout(delay);
  }, [search, location, page]);

  const toggleCompare = (college) => {
    if (selected.find(c => c.id === college.id)) {
      setSelected(selected.filter(c => c.id !== college.id));
    } else if (selected.length < 2) {
      setSelected([...selected, college]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">

      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center mb-10 tracking-wide">
        🎓 College Finder
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">

        <input
          className="w-full md:w-1/3 px-5 py-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="🔍 Search colleges..."
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page
          }}
        />

        <select
          onChange={(e) => {
            setLocation(e.target.value);
            setPage(1); // reset page
          }}
          className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-600"
        >
          <option value="">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-blue-400 mb-6 animate-pulse">
          Loading colleges...
        </p>
      )}

      {/* Empty */}
      {!loading && colleges.length === 0 && (
        <p className="text-center text-gray-400 mb-6">
          No colleges found
        </p>
      )}

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map(c => (
          <CollegeCard
            key={c.id}
            college={c}
            selected={selected}
            toggleCompare={toggleCompare}
          />
        ))}
      </div>

      {/* 🔥 PAGINATION UI */}
      <div className="flex justify-center items-center gap-4 mt-10">

        <button
          disabled={!pagination.hasPrevPage}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
        >
          ← Prev
        </button>

        <span className="text-gray-300">
          Page {pagination.page || 1} of {pagination.totalPages || 1}
        </span>

        <button
          disabled={!pagination.hasNextPage}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
        >
          Next →
        </button>

      </div>

      {/* Compare Button */}
      <div className="flex justify-center mt-12">
        <button
          disabled={selected.length < 2}
          onClick={() => {
            navigate("/compare", { state: selected });
            setSelected([]);
          }}
          className={`px-8 py-3 rounded-xl text-lg font-semibold transition ${
            selected.length < 2
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-lg"
          }`}
        >
          Compare Selected ({selected.length})
        </button>
      </div>

      {/* Saved */}
      <div className="flex justify-center mt-6">
        <Link to="/saved" className="text-green-400 hover:underline">
          ⭐ View Saved Colleges
        </Link>
      </div>

    </div>
  );
}

export default Home;