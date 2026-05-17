function CompareTable({ c1, c2 }) {
  return (
    <table className="min-w-full border-separate border-spacing-0 text-center bg-slate-900/90 rounded-3xl overflow-hidden">
      <thead className="bg-slate-950/90 text-sm uppercase tracking-[0.2em] text-slate-400">
        <tr>
          <th className="border border-slate-700 px-4 py-4">Feature</th>
          <th className="border border-slate-700 px-4 py-4">{c1.name}</th>
          <th className="border border-slate-700 px-4 py-4">{c2.name}</th>
        </tr>
      </thead>

      <tbody className="text-sm text-slate-200">
        {[
          { label: "Location", value1: c1.location || "N/A", value2: c2.location || "N/A" },
          {
            label: "Fees",
            value1: c1.fees ? `₹${new Intl.NumberFormat("en-IN").format(c1.fees)}` : "N/A",
            value2: c2.fees ? `₹${new Intl.NumberFormat("en-IN").format(c2.fees)}` : "N/A",
          },
          {
            label: "Rating",
            value1: c1.rating ? `⭐ ${c1.rating}` : "N/A",
            value2: c2.rating ? `⭐ ${c2.rating}` : "N/A",
          },
          { label: "Est. Year", value1: c1.establishmentYear || "N/A", value2: c2.establishmentYear || "N/A" },
          {
            label: "Courses",
            value1: c1.courses?.length > 0 ? c1.courses.length : "N/A",
            value2: c2.courses?.length > 0 ? c2.courses.length : "N/A",
          },
          {
            label: "Website",
            value1: c1.website ? <a href={c1.website} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-200">Visit</a> : "N/A",
            value2: c2.website ? <a href={c2.website} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-200">Visit</a> : "N/A",
          },
        ].map((row) => (
          <tr key={row.label} className="border-t border-slate-800 hover:bg-slate-950/70 transition-colors">
            <td className="border-slate-700 px-4 py-4 text-left text-slate-300 font-medium">{row.label}</td>
            <td className="border-slate-700 px-4 py-4">{row.value1}</td>
            <td className="border-slate-700 px-4 py-4">{row.value2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CompareTable;
