"use client";

import Cookies from "universal-cookie";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useHttpClient } from "@/hooks/http-hook";

export default function SignUpForm() {

  const cookies = new Cookies();
  const router = useRouter();
  const { sendRequest } = useHttpClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let responseData = await sendRequest(
        `${NEXT_PUBLIC_API_URL}/api/users/register`,
        "POST",
        JSON.stringify({
          email,
          password,
          userName: username
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if (responseData) {
        cookies.set("TOKEN", responseData.token, {
          path: "/",
        });
        cookies.set("userId", responseData.userId, {
          path: "/",
        });
        cookies.set("courses", responseData.courses);
        cookies.set(
          "userInfo",
          {
            userName: responseData.username,
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
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">إنشاء حساب جديد</h3>
              <p className="mt-10">
                تمتلك حساب بالفعل؟
                <Link href="/login" className="text-purple-1">
                  تسجيل الدخول
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    البريد الإلكتروني *
                  </label>
                  <input required type="text" name="title" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    اسم المستخدم *
                  </label>
                  <input required type="text" name="title" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="new user" />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    كلمة السر *
                  </label>
                  <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="title" placeholder="****" />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    تأكيد كلمة السر *
                  </label>
                  <input required type="password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="title" placeholder="****" />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    إنشاء حساب
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
