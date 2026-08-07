import API_BASE_URL from "../config/api";

async function parseJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

// 🔥 LOGIN
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseJson(res);

  if (!res.ok) {
    const err = new Error(data.error || data.message || "Login failed");
    err.unverified = !!data.unverified;
    err.email = data.email;
    throw err;
  }

  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

// 🔥 REGISTER (step 1 — creates an unverified account and triggers an OTP email)
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await parseJson(res);

  if (!res.ok) throw new Error(data.errors?.[0] || data.error || "Registration failed");

  return data;
};

// 🔥 VERIFY OTP (step 2 — confirms the emailed code and logs the user in)
export const verifyOtp = async (email, otp) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/verify_otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await parseJson(res);

  if (!res.ok) throw new Error(data.error || "Verification failed");

  if (data.token) localStorage.setItem("token", data.token);
  return data;
};

// 🔥 RESEND OTP
export const resendOtp = async (email) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/resend_otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await parseJson(res);

  if (!res.ok) throw new Error(data.error || "Could not resend code");

  return data;
};
