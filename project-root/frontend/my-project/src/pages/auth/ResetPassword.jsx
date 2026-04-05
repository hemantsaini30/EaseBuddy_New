import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const ResetPassword = () => {
  const { token }    = useParams();
  const navigate     = useNavigate();
  const { updateUser } = useAuth();

  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [show,      setShow]      = useState(false); // toggle password visibility
  const [loading,   setLoading]   = useState(false);
  const [verifying, setVerifying] = useState(true);  // checking token validity
  const [tokenValid,setTokenValid]= useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);

  // On mount, verify the token is still valid
  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/auth/verify-reset-token/${token}`);
        setTokenValid(true);
      } catch {
        setTokenValid(false);
      } finally {
        setVerifying(false);
      }
    };
    verify();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, { password });
      // Auto-login with the returned token
      localStorage.setItem("easebuddy_token", data.data.token);
      localStorage.setItem("easebuddy_user",  JSON.stringify(data.data));
      updateUser(data.data);
      setSuccess(true);
      // Redirect to dashboard after 2 seconds
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getStrength = (pw) => {
    if (!pw) return { label: "", width: "0%", color: "" };
    if (pw.length < 6)  return { label: "Too short", width: "25%", color: "bg-red-500"    };
    if (pw.length < 8)  return { label: "Weak",      width: "50%", color: "bg-amber-500"  };
    if (pw.length < 12) return { label: "Good",      width: "75%", color: "bg-blue-500"   };
    return               { label: "Strong",    width: "100%", color: "bg-green-500"  };
  };
  const strength = getStrength(password);

  // ── Loading state while verifying token ──
  if (verifying) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    );
  }

  // ── Invalid / expired token ──
  if (!tokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-4 dark:from-gray-950 dark:to-gray-900">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <span className="text-5xl">⏰</span>
          <h2 className="mt-4 text-xl font-black text-gray-900 dark:text-white">
            Link expired
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            This reset link has expired or already been used. Reset links are only valid for 1 hour.
          </p>
          <Link
            to="/forgot-password"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Request new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-4 dark:from-gray-950 dark:to-gray-900">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">

        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="text-5xl">🔑</span>
          <h1 className="mt-3 text-2xl font-black text-gray-900 dark:text-white">
            Set new password
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Choose a strong password for your account
          </p>
        </div>

        {success ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-900">
              ✅
            </div>
            <div>
              <p className="font-bold text-gray-800 dark:text-white">
                Password changed!
              </p>
              <p className="mt-1 text-sm text-gray-500">
                You're being logged in automatically...
              </p>
            </div>
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full animate-pulse rounded-full bg-indigo-600" style={{ width: "100%" }} />
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <>
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* New password */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Min 6 characters"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 pr-10 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {show ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Strength bar */}
                {password && (
                  <div className="mt-2">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                        style={{ width: strength.width }}
                      />
                    </div>
                    <p className={`mt-1 text-xs font-medium ${
                      strength.color
                        .replace("bg-", "text-")
                        .replace("-500", "-600")
                    }`}>
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm password
                </label>
                <input
                  type={show ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  placeholder="Repeat your password"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
                    focus:ring-2 focus:ring-indigo-100 dark:bg-gray-800 dark:text-white
                    ${confirm && confirm !== password
                      ? "border-red-400 focus:border-red-400"
                      : confirm && confirm === password
                      ? "border-green-400 focus:border-green-400"
                      : "border-gray-300 focus:border-indigo-500 dark:border-gray-700"
                    }`}
                />
                {confirm && confirm !== password && (
                  <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                )}
                {confirm && confirm === password && (
                  <p className="mt-1 text-xs text-green-600">✓ Passwords match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !password || password !== confirm}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Set New Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;