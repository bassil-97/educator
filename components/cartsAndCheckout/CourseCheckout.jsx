"use client";

import React, { useState, useRef, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import { useHttpClient } from "@/hooks/http-hook";
import Link from "next/link";
import { GoSell } from "@tap-payments/gosell";
import Cookies from "universal-cookie";

export default function CourseCheckOut() {
  const cookies = new Cookies();
  const { sendRequest } = useHttpClient();
  const { cartCourses } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shiping, setShiping] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  
  const storedData = cookies.get("userInfo");
  const userId = cookies.get("userId");

  useEffect(() => {
    const sum = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.discountedPrice * currentValue.quantity;
    }, 0);
    const sumQuantity = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity;
    }, 0);
    setShiping(sumQuantity * 10);
    setTotalPrice(sum);
    setEmail(storedData["email"]);
  }, [cartCourses]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCreateCharge = async (response) => {
    if (response["callback"]["status"] === "CAPTURED") {
      
      let cartItems = JSON.parse(localStorage.getItem("cartCourses"));
      let responseData = await sendRequest(
        "http://localhost:5000/api/users/create-transaction",
        "POST",
        JSON.stringify({
          amount: response["callback"]["amount"],
          items: cartItems,
          userId: userId
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if(responseData["coursesAdded"]) localStorage.removeItem("cartCourses");
    }
  };

  const handleSubmitOrder = () => {
    localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
    GoSell.openPaymentPage();
  };

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">إكمال عملية الشراء</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    ابدأ تأسيس مشروعك أونلاين من خلال "كورس حرر عقلك"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50">
            <div className="col-lg-8">
              <div className="shopCheckout-form">
                <GoSell
                  gateway={{
                    publicKey: "pk_live_XunlTCS9WBDVaYorHb8sKcjq",
                    language: "en",
                    contactInfo: true,
                    supportedCurrencies: "all",
                    supportedPaymentMethods: "all",
                    saveCardOption: true,
                    customerCards: true,
                    notifications: "standard",
                    backgroundImg: {
                      url: "imgURL",
                      opacity: "0.5",
                    },
                    callback: (response) => handleCreateCharge(response),
                    labels: {
                      cardNumber: "Card Number",
                      expirationDate: "MM/YY",
                      cvv: "CVV",
                      cardHolder: "Name on Card",
                      actionButton: "Pay",
                    },
                    style: {
                      base: {
                        color: "#535353",
                        lineHeight: "18px",
                        fontFamily: "sans-serif",
                        fontSmoothing: "antialiased",
                        fontSize: "16px",
                        "::placeholder": {
                          color: "rgba(0, 0, 0, 0.26)",
                          fontSize: "15px",
                        },
                      },
                      invalid: {
                        color: "red",
                        iconColor: "#fa755a ",
                      },
                    },
                  }}
                  customer={{
                    first_name: firstName,
                    last_name: lastName,
                    email: email
                  }}
                  order={{
                    amount: `${totalPrice}`,
                    currency: "KWD",
                    items: cartCourses,
                    shipping: null,
                    taxes: null,
                  }}
                  transaction={{
                    mode: "charge",
                    charge: {
                      saveCard: false,
                      threeDSecure: true,
                      description: "Test Description",
                      statement_descriptor: "Sample",
                      reference: {
                        transaction: "txn_0001",
                        order: "ord_0001",
                      },
                      metadata: {},
                      receipt: {
                        email: false,
                        sms: true,
                      },
                      redirect: null,
                      post: "http://localhost:3000/courses-list-1",
                      source: {
                        id: "src_all"
                      }
                    },
                  }}
                />
                
                <form
                  onSubmit={handleSubmit}
                  className="contact-form row x-gap-30 y-gap-30"
                >
                  <div className="col-12">
                    <h5 className="text-20">بيانات الدفع</h5>
                  </div>
                  <div className="col-sm-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      الاسم الأول
                    </label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      اسم العائلة
                    </label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      البريد الإلكتروني *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email address *"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mt-30">
                   
                    <button onClick={() => handleSubmitOrder()}>
                      open goSell Page
                    </button>
                    {/* <button onClick={() => GoSellElements.submit()}>Submit</button> */}
                    {/* <button onClick={() => GoSell.openPaymentPage()}>
                      إكمال الطلب
                    </button> */}
                    {/* <button type="submit" className="button -md -accent col-12 -uppercase">
                    اكمل الطلب
                  </button> */}
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="">
                <div className="pt-30 pb-15 bg-white border-light rounded-8 bg-light-4">
                  <h5 className="px-30 text-20 fw-500">الطلب الخاص بك</h5>

                  <div className="d-flex justify-between px-30 mt-25">
                    <div className="py-15 fw-500 text-dark-1">المنتج</div>
                    <div className="py-15 fw-500 text-dark-1">المجموع</div>
                  </div>

                  {cartCourses.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex justify-between ${
                        i == 0 ? "border-top-dark" : ""
                      }  px-30`}
                    >
                      <div className="py-15 text-grey">
                        <Link
                          className="linkCustom"
                          href={`/courses/${elm.id}`}
                        >
                          {elm.title}{" "}
                        </Link>{" "}
                        x {elm.quantity}
                      </div>
                      <div className="py-15 text-grey">
                        $
                        {(elm.discountedPrice * elm.quantity).toFixed(2) ||
                          "Free"}
                      </div>
                    </div>
                  ))}

                  {/* <div className="d-flex justify-between border-top-dark px-30">
                    <div className="py-15 fw-500">المجموع</div>
                    <div className="py-15 fw-500">${totalPrice.toFixed(2)}</div>
                  </div> */}

                  {/* <div className="d-flex justify-between border-top-dark px-30">
                    <div className="py-15 fw-500 text-dark-1">Shipping</div>
                    <div className="py-15 fw-500 text-dark-1">
                      ${shiping.toFixed(2)}
                    </div>
                  </div> */}

                  <div className="d-flex justify-between border-top-dark px-30">
                    <div className="py-15 fw-500 text-dark-1">
                      المجموع الكلي
                    </div>
                    <div className="py-15 fw-500 text-dark-1">
                      ${totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* <div className="py-30 px-30 bg-white mt-30 border-light rounded-8 bg-light-4">
                  <h5 className="text-20 fw-500">Payment</h5>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="radio" checked="checked" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 fw-500 text-dark-1">
                        Direct bank transfer
                      </h5>
                    </div>
                    <p className="ml-25 pl-5 mt-25">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="radio" checked="checked" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">
                        Check payments
                      </h5>
                    </div>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="radio" checked="checked" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">
                        Cash on delivery
                      </h5>
                    </div>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="radio" checked="checked" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">PayPal</h5>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
