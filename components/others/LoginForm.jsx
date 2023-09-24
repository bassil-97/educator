"use client";

import Cookies from "universal-cookie";
import { useHttpClient } from "@/hooks/http-hook";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginForm() {

  const cookies = new Cookies();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendRequest } = useHttpClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let responseData = await sendRequest(
        `http://api.faconsulting.me/api/users/login`,
        "POST",
        JSON.stringify({
          email,
          password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (responseData) {
        cookies.set("TOKEN", responseData.token, {
          path: "/",
        });
        cookies.set("userId", responseData.id, {
          path: "/",
        });
        cookies.set(
          "userInfo",
          {
            userName: responseData.userName,
            email: responseData.email,
          },
          { path: "/" }
        );
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">تسجيل الدخول</h3>
              <p className="mt-10">
                ليس لديك حساب؟ 
                <Link href="/signup" className="text-purple-1">
                  أنشىء حساب مجانا
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    البريد الالكتروني
                  </label>
                  <input required type="text" name="title" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    كلمة السر
                  </label>
                  <input
                    required
                    type="password"
                    name="title"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="****"
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    تسجيل الدخول
                  </button>
                </div>
              </form>

              {/* <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <div>
                  <button className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                    Log In via Facebook
                  </button>
                </div>
                <div>
                  <button className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                    Log In via Google+
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
