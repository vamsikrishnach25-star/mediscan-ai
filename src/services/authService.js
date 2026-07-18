import API_BASE_URL from "../config/api";

// 🔥 LOGIN
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || data.message || "Login failed");

    localStorage.setItem("token", data.token);

    return data;
  } catch (err) {
    throw err;
  }
};

// 🔥 REGISTER
export const registerUser = async (name, email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.errors?.[0] || data.error || "Registration failed");

    return data;
  } catch (err) {
    throw err;
  }
};