"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners"; // Import spinner
import { AUTH, PATH } from "@/core/consts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (email === "incorrect@email.com") {
      setError(AUTH.LOGIN.EMAIL_ERROR_MESSAGE);
      return;
    }
    if (password === "incorrect-password") {
      setError(AUTH.LOGIN.PASSWORD_ERROR_MESSAGE);
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleOtpSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(PATH.BALANCE);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-10">
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
          </div>
        )}
        {step === 1 ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              {AUTH.LOGIN.LOGIN_FORM_TITLE}
            </h2>
            <input
              type="email"
              placeholder={AUTH.LOGIN.EMAIL_PLACEHOLDER}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="password"
              placeholder={AUTH.LOGIN.PASSWORD_PLACEHOLDER}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white p-2 mt-2 rounded w-full hover:bg-blue-700"
            >
              {AUTH.LOGIN.LOGIN_FORM_BUTTON_LABEL}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">
              {AUTH.LOGIN.OTP_FORM_TITLE}
            </h2>
            <input
              type="text"
              placeholder={AUTH.LOGIN.OTP_PLACEHOLDER}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <button
              onClick={handleOtpSubmit}
              className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
            >
              {AUTH.LOGIN.OTP_FORM_BUTTON_LABEL}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
