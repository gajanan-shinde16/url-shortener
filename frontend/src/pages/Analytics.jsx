import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/analytics");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen px-6 text-white">

      <h1 className="text-4xl font-bold mb-6">Analytics</h1>

      {/* Chart */}
      <div className="glass-card p-6 mb-6">
        <h2 className="mb-4 text-lg">Clicks per URL</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="short_code" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="clicks" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="glass-card p-6 overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-300">
              <th>Short</th>
              <th>Original</th>
              <th>Clicks</th>
              <th>Last Access</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td>{item.short_code}</td>
                <td className="truncate max-w-xs">{item.original_url}</td>
                <td>{item.clicks}</td>
                <td>{item.last_accessed || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}