import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password }
      );

      alert("Registered successfully");
      window.location.href = "/login";
    } catch (err) {
    const msg = err.response?.data?.error || "Registration failed";
    alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="glass-card p-6 w-80 flex flex-col gap-4">

        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded text-black"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded text-black"
        />

        <button
          onClick={handleRegister}
          className="bg-blue-500 p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

      </div>
    </div>
  );
}