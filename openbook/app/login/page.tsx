"use client";

import { useState } from "react";
import Link from "next/link";

const USERS = [
  {
    name: "John",
    email: "johndoe@anemail.com",
    password: "12345678"
  }
]

/**
 * queryUser
 * Finds if a matching user exists in the database
 * Returns the name of the user or incorrect password
 * 
 * TOO BE REPLACED WITH PROPER DATABASE QUERY
 */
function queryUser({email, password}):string{
  const found_users = USERS.filter((user)=>(user.email == email && user.password == password));
  if (found_users.length > 0){
    return found_users[0].name;
  }
  return "PASS_ERR";
}

export default function SignupPage() {
  const [form, setForm] = useState({email: "", password: ""});
  const [name, setName] = useState("");
  const [formError, setFormError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const valid =
    form.password.length >= 8 &&
    form.email.includes("@");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid){
      const status = queryUser(form)
      if ( status != "PASS_ERR"){
        setName(status);
        setSubmitted(true);
      } else {
        setFormError(true)
      }
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">You&apos;re in!</h2>
          <p className="text-sm text-gray-500 mb-6">Welcome back, <span className="font-semibold text-gray-700">{name}</span>.</p>
          <Link href="/dashboard" className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2.5 rounded-lg text-center transition-colors">
            Go to Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-700" />

          <div className="p-8">
            {/* Logo + Heading */}
            <div className="mb-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-base">OB</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
              <p className="text-sm text-gray-500 mt-1">
                Need to make one?{" "}
                <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">Sign up</Link>
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={update}
                    placeholder="Min. 8 characters"
                    className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
          
              </div>

              {/* Form Error */}
              {formError && 
              <span className="text-sm text-red-500 mt-1">Username or password was incorrect</span>
              }
              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!valid}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all mt-2 ${
                  valid
                    ? "bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow-md"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} SiteName. All rights reserved.
        </p>
      </div>
    </div>
  );
}
