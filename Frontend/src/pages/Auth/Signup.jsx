import { useAppDispatch } from "../../hooks/reduxHooks";
import { registerUser } from "../../features/auth/authSlice";
import { useState } from "react";

const Signup = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "INDIVIDUAL",
  });

  const passwordsMatch =
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;

    const { confirmPassword, ...payload } = form;
    dispatch(registerUser(payload));
  };

  return (
    <div>
      <h2 className="text-[28px] font-bold mb-1 text-[#000000]">
        BE PART OF THE CHANGE
      </h2>
      <p className="text-[#595957] mb-6 text-sm">Sign Up Today!</p>

      <form onSubmit={handleSubmit} className="space-y-4 m-1">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-[#40403e] mb-1.5">
            User Name
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 text-sm border-[#d4d4d4] rounded-md bg-[#F8F8F8] focus:outline-none focus:border-[#efa13d] focus:ring-1 focus:ring-[#efa13d] transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-[#40403e] mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 text-sm border-[#d4d4d4] rounded-md bg-[#F8F8F8] focus:outline-none focus:border-[#efa13d] focus:ring-1 focus:ring-[#efa13d] transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-[#40403e] mb-1.5">
            Password
          </label>
          <input
            name="password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2 text-sm border-[#d4d4d4] rounded-md bg-[#F8F8F8] focus:outline-none focus:border-[#efa13d] focus:ring-1 focus:ring-[#efa13d] transition-all"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-medium text-[#40403e] mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full px-3 py-2 text-sm border-[#d4d4d4] rounded-md bg-[#F8F8F8] focus:outline-none focus:border-[#efa13d] focus:ring-1 focus:ring-[#efa13d] transition-all"
          />

          {/* Error Message */}
          {form.confirmPassword && !passwordsMatch && (
            <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!passwordsMatch}
            className={`w-[200px] text-white font-semibold py-2 rounded-2xl transition-all duration-200 shadow-sm mt-2 text-sm
              ${
                passwordsMatch
                  ? "bg-[#efa13d] hover:bg-[#d99338]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            SIGN UP
          </button>
        </div>
      </form>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-[#d4d4d4]"></div>
        <span className="px-3 text-xs text-[#8c8c8a]">Or</span>
        <div className="flex-1 border-t border-[#d4d4d4]"></div>
      </div>

      <div className="flex justify-center">
        <button className="w-[300px] border border-[#d4d4d4] hover:border-[#bfbfbd] py-2.5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 hover:bg-[#FFFBEC] bg-[#FFFBEC] text-sm">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="font-medium text-[#595957]">
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
