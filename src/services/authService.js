import API_BASE_URL from "../config/api";

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

    if (!res.ok) throw new Error(data.message);

    // store token
    localStorage.setItem("token", data.token);

    return data;
  } catch (err) {
    throw err;
  }
};