import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function CollegeCard({ college, selected, toggleCompare }) {

  const [savedIds, setSavedIds] = useState([]);

  // Load saved data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved")) || [];
    setSavedIds(saved.map(c => c.id));
  }, []);

  // 🔥 TOGGLE SAVE (SAVE + REMOVE)
  const toggleSave = () => {
    let saved = JSON.parse(localStorage.getItem("saved")) || [];

    const exists = saved.find(c => c.id === college.id);

    if (exists) {
      // ❌ REMOVE
      saved = saved.filter(c => c.id !== college.id);
    } else {
      // ⭐ SAVE
      saved.push(college);
    }

    localStorage.setItem("saved", JSON.stringify(saved));
    setSavedIds(saved.map(c => c.id));
  };

  return (
    <div className="bg-gray-800 p-5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">{college.name}</h3>

        <input
          type="checkbox"
          className="w-4 h-4 accent-blue-500 cursor-pointer"
          checked={selected.some(s => s.id === college.id)}
          onChange={() => toggleCompare(college)}
        />
      </div>

      {/* Location */}
      <p className="text-gray-400">{college.location}</p>

      {/* Fees */}
      <p className="mt-2 text-lg font-medium text-green-400">
        ₹{college.fees}
      </p>

      {/* Rating */}
      <p className="text-yellow-400 font-semibold flex items-center gap-1">
        ⭐ {college.rating}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-700 my-3"></div>

      {/* Actions */}
      <div className="flex justify-between items-center">

        <Link
          to={`/college/${college.id}`}
          className="text-blue-400 hover:text-blue-300 font-medium transition"
        >
          View Details →
        </Link>

        {/* ⭐ Toggle Save Button */}
        <button
          onClick={toggleSave}
          className={`text-sm ${
            savedIds.includes(college.id)
              ? "text-red-400"
              : "text-yellow-400 hover:text-yellow-300"
          }`}
        >
          {savedIds.includes(college.id) ? "Remove ❌" : "Save ⭐"}
        </button>

      </div>

    </div>
  );
}

export default CollegeCard;