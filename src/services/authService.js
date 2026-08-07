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

// 🔥 FORGOT PASSWORD — request a reset code by email
export const forgotPassword = async (email) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/forgot_password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await parseJson(res);

  if (!res.ok) throw new Error(data.error || "Something went wrong");

  return data;
};

// 🔥 RESET PASSWORD — confirm the code and set a new password
export const resetPassword = async (email, otp, password) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/reset_password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, password }),
  });

  const data = await parseJson(res);

  if (!res.ok) throw new Error(data.error || "Could not reset password");

  return data;
};

// 🔥 CHANGE PASSWORD — for a signed-in user
export const changePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/api/v1/change_password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });

  const data = await parseJson(res);

  if (!res.ok) throw new Error(data.error || "Could not change password");

  return data;
};
