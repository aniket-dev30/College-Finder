import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCollegeById } from "../services/api";

function CollegeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getCollegeById(id);
        setCollege(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch college details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/80 p-8 shadow-xl border border-white/10">
          <p className="text-lg font-medium text-gray-200">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/80 p-8 shadow-xl border border-white/10 space-y-4">
          <p className="text-red-400 font-semibold">{error}</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
            >
              Retry
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-xl transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/80 p-8 shadow-xl border border-white/10 space-y-4">
          <p className="text-2xl font-semibold">College not found</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
          >
            ← Back to Colleges
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          ← Back to Colleges
        </button>

        <div className="rounded-3xl bg-slate-950/90 p-8 shadow-2xl shadow-black/40 border border-white/10">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white">
                {college?.name || "College Name Unavailable"}
              </h1>
              <p className="mt-3 text-sm text-gray-300">
                {college?.location || "Location not available"}
              </p>
            </div>

            {college?.image && (
              <img
                src={college.image}
                alt={college.name || "College"}
                className="w-full rounded-3xl object-cover shadow-lg border border-white/10"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl bg-slate-900/80 p-6 border border-white/10">
                <p className="text-sm text-gray-400">Location</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {college?.location || "N/A"}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-6 border border-white/10">
                <p className="text-sm text-gray-400">Fees (Annual)</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {college?.fees && !isNaN(college.fees)
                    ? `₹${new Intl.NumberFormat("en-IN").format(college.fees)}`
                    : "Not Available"}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-6 border border-white/10">
                <p className="text-sm text-gray-400">Rating</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {college?.rating && !isNaN(college.rating)
                    ? `⭐ ${college.rating}`
                    : "N/A"}
                </p>
                {college?.rating && !isNaN(college.rating) && college.rating > 4 && (
                  <p className="mt-2 text-sm text-emerald-400">Excellent</p>
                )}
              </div>
            </div>

            {college?.establishmentYear && (
              <div className="rounded-3xl bg-slate-900/80 p-6 border border-white/10">
                <p className="text-sm text-gray-400">Established</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {college.establishmentYear}
                </p>
              </div>
            )}

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-white">Courses Offered</h2>
                {Array.isArray(college?.courses) && college.courses.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {college.courses.map((course, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-200"
                      >
                        {course || "Course"}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-400">No courses information available.</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/80 p-6 border border-white/10">
                  <p className="text-sm text-gray-400">Average Package</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {college?.avgPackage || "Not Available"}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-6 border border-white/10">
                  <p className="text-sm text-gray-400">Highest Package</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {college?.highestPackage || "Not Available"}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white">Campus Facilities</h2>
                {Array.isArray(college?.facilities) && college.facilities.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {college.facilities.map((facility, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-slate-800/90 px-4 py-2 text-sm text-gray-200"
                      >
                        {facility || "Facility"}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-400">No facilities information available.</p>
                )}
              </div>

              {college?.website && typeof college.website === "string" && (
                <div className="rounded-3xl bg-slate-900/80 p-6 border border-white/10">
                  <p className="text-sm text-gray-400">Official Website</p>
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-blue-400 hover:text-blue-300 break-all"
                  >
                    {college.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeDetail;
