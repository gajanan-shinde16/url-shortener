export default function ResultCard({ shortUrl }) {
  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  };

  return (
    <div className="glass-card mt-6 p-6 w-full text-center border border-blue-500/20">
      
      <p className="mb-2 text-gray-400">Your Short URL</p>

      <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg">
        <a
          href={shortUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 break-all"
        >
          {shortUrl || "No URL generated"}
        </a>

        <button
          onClick={copyToClipboard}
          className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Copy
        </button>
      </div>

    </div>
  );
}