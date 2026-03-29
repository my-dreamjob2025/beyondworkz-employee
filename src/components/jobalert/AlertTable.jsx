const AlertTable = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
          <tr>
            <th className="p-4 text-left">Job Role</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Experience</th>
            <th className="p-4 text-left">Frequency</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={6} className="p-8 text-center text-slate-500">
              No job alerts configured. This table will list your alerts when the feature is available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
