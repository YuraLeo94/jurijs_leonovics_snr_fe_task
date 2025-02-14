"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { AUTH, PATH } from "@/core/consts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().refine((val) => val !== "incorrect@email.com", {
    message: AUTH.LOGIN.EMAIL_ERROR_MESSAGE,
  }),
  password: z.string().refine((val) => val !== "incorrect-password", {
    message: AUTH.LOGIN.PASSWORD_ERROR_MESSAGE,
  }),
});

const otpSchema = z.object({
  otp: z.string().length(6, AUTH.LOGIN.OTP_ERROR_MESSAGE),
});

export default function Login() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(step === 1 ? loginSchema : otpSchema),
  });

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 1) {
        reset();
        setStep(2);
      } else {
        router.push(PATH.BALANCE);
      }
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
        <h2 className="text-xl font-bold mb-4">
          {step === 1 ? AUTH.LOGIN.LOGIN_FORM_TITLE : AUTH.LOGIN.OTP_FORM_TITLE}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 ? (
            <>
              <input
                type="email"
                placeholder={AUTH.LOGIN.EMAIL_PLACEHOLDER}
                {...register("email")}
                className="border p-2 rounded w-full mb-2"
              />
              {errors.email?.message && (
                <p className="text-red-500">{String(errors.email.message)}</p>
              )}
              <input
                type="password"
                placeholder={AUTH.LOGIN.PASSWORD_PLACEHOLDER}
                {...register("password")}
                className="border p-2 rounded w-full mb-2"
              />
              {errors.password?.message && (
                <p className="text-red-500">
                  {String(errors.password.message)}
                </p>
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder={AUTH.LOGIN.OTP_PLACEHOLDER}
                {...register("otp")}
                className="border p-2 rounded w-full mb-2"
              />
              {errors.otp?.message && (
                <p className="text-red-500">{String(errors.otp.message)}</p>
              )}
            </>
          )}
          <button
            type="submit"
            className={`p-2 mt-2 rounded w-full text-white ${
              step === 1
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {step === 1
              ? AUTH.LOGIN.LOGIN_FORM_BUTTON_LABEL
              : AUTH.LOGIN.OTP_FORM_BUTTON_LABEL}
          </button>
        </form>
      </div>
    </div>
  );
}
