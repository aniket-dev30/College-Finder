import { useLocation, useNavigate } from "react-router-dom";
import CompareTable from "../components/CompareTable";

function Compare() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || state.length < 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-950/90 border border-white/10 p-8 shadow-2xl shadow-black/40 text-center">
          <h1 className="text-3xl font-semibold mb-4">Select Two Colleges</h1>
          <p className="text-slate-400 mb-6">
            Please choose two colleges from the home page to compare their details side by side.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const [c1, c2] = state;

  // 🔥 HIGHLIGHT LOGIC
  const betterRating = c1.rating > c2.rating ? c1.id : c2.id;
  const lowerFees = c1.fees < c2.fees ? c1.id : c2.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          ← Back to Home
        </button>

        <div className="rounded-3xl bg-slate-950/90 border border-white/10 p-8 shadow-2xl shadow-black/40">
          <div className="space-y-4">

            <div>
              <h1 className="text-4xl font-extrabold">Compare Colleges</h1>
              <p className="mt-2 text-slate-400">
                View key data side-by-side for a smarter college choice.
              </p>
            </div>

            {/* 🔥 UPDATED CARDS */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[c1, c2].map((college, idx) => {
                const isBestRating = college.id === betterRating;
                const isBestFees = college.id === lowerFees;

                return (
                  <div key={idx} className="rounded-3xl bg-slate-900/80 p-6 border border-white/10">

                    <h2 className="text-xl font-semibold text-white mb-3">
                      {college.name}
                    </h2>

                    {/* Location */}
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="mt-1 text-lg text-white">
                      {college.location || "N/A"}
                    </p>

                    {/* Fees */}
                    <p className="mt-4 text-sm text-slate-400">Fees</p>
                    <p className={`mt-1 text-lg ${isBestFees ? "text-green-400 font-bold" : "text-white"}`}>
                      {college.fees
                        ? `₹${new Intl.NumberFormat("en-IN").format(college.fees)}`
                        : "N/A"}
                      {isBestFees && (
                        <span className="ml-2 text-xs text-green-400">Best</span>
                      )}
                    </p>

                    {/* Rating */}
                    <p className="mt-4 text-sm text-slate-400">Rating</p>
                    <p className={`mt-1 text-lg ${isBestRating ? "text-green-400 font-bold" : "text-white"}`}>
                      {college.rating ? `⭐ ${college.rating}` : "N/A"}
                      {isBestRating && (
                        <span className="ml-2 text-xs text-green-400">Best</span>
                      )}
                    </p>

                  </div>
                );
              })}
            </div>

            {/* Table */}
            <div className="overflow-x-auto pt-4">
              <CompareTable c1={c1} c2={c2} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;