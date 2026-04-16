import { useState } from "react";
import UrlForm from "../components/UrlForm";
import ResultCard from "../components/ResultCard";

export default function Home() {
  const [shortUrl, setShortUrl] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6">

      {/* HERO */}
      <div className="flex flex-col items-center text-center gap-6 w-full max-w-2xl">
        
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Shorten URLs <br />
          <span className="text-blue-400">Smarter & Faster</span>
        </h1>

        

        <UrlForm setShortUrl={setShortUrl} />

        {shortUrl?.length > 0 && (
          <ResultCard shortUrl={shortUrl} />
        )}
      </div>

    </div>
  );
}