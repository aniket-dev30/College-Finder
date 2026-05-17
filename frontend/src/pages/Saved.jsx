import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Saved() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("saved")) || [];
    setSaved(data);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">

      <h1 className="text-4xl font-bold mb-8 text-center">
        ⭐ Saved Colleges
      </h1>

      {saved.length === 0 ? (
        <p className="text-center text-gray-400">
          No saved colleges yet
        </p>
      ) : (
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {saved.map(college => (
            <div
              key={college.id}
              className="bg-gray-800 p-5 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold">
                {college.name}
              </h2>

              <p className="text-gray-400">
                {college.location}
              </p>

              <p className="text-green-400 mt-2">
                ₹{college.fees}
              </p>

              <Link
                to={`/college/${college.id}`}
                className="text-blue-400 mt-2 inline-block"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Saved;