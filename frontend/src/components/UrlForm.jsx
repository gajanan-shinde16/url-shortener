import { useState } from "react";
import axios from "axios";

export default function UrlForm({ setShortUrl }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim()) return;

    try {
      console.log("Button clicked");

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/shorten",
        { original_url: url }
      );

      console.log("Response:", res.data);

      setShortUrl(res.data?.short_url?.trim() || "");
      setUrl("");

    } catch (err) {
      console.error(err);
      alert("Error shortening URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 w-full flex flex-col gap-4">

      <input
        type="text"
        placeholder="Paste your long URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="p-3 rounded-xl bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        className="btn bg-blue-500 hover:bg-blue-600 hover:scale-105 active:scale-95"
      >
        {loading ? "Generating..." : "Shorten URL"}
      </button>

    </div>
  );
}