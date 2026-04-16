import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );

    alert("Logged out");
    window.location.href = "/login";
  };

  return (
    <nav className="flex justify-between p-4 text-white border-b border-white/10">

      <h1 className="text-blue-400 font-bold">Shortify</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

    </nav>
  );
}